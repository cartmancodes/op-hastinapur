import React, { useState } from 'react'
import AlertBar from './AlertBar'
import { mockRecommendation } from '../../mockData/MapData';
import { Button } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph,TextRun } from "docx";
import InfoButton from '../ui/InfoButton';
import { newRecomandationModel } from '../../mockData/MapData'


function recomendationDocumentGenerator(recomandations) {
    let sections = recomandations.map((reco) => {
        return generateSection(reco);
    })
    const doc = new Document({
        sections: sections
    });

    Packer.toBlob(doc).then(blob => {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'action-items.docx';

        // Programmatically trigger the download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
    });
}

function generateSection(reco) {
    let topicsWithDesc = reco.points.map((point) => {
        return makePoint(point);
    });
    let allPoints = topicsWithDesc.flat();
    return {
        properties: {},
        children: [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                heading: HeadingLevel.TITLE,
                bold: true,
                children: [
                    new TextRun(reco.main_topic),
                ],
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun(reco.heading)
                ]
            }),
            ...allPoints
        ],
    }
}

function makePoint(point) {
    console.log(point)
    let points = point.description
    .map((desc) => {
        return new Paragraph({
            text: desc,
            bullet: {
                level: 1 // How deep you want the bullet to be. Maximum level is 9
            }
        })
    });
    return [
        new Paragraph({
            text: point.topic,
            heading: HeadingLevel.HEADING_1,
            bullet: {
                level: 0 // How deep you want the bullet to be. Maximum level is 9
            }
        }),
        ...points
    ]
}


function ActionCard() {
    const tooltipText = "Recommendations are categorised based on SDG Impact.";
    const [filter, setFilter] = useState("total")
    const [recomandation, setRecomandations] = useState(newRecomandationModel);
    let standardCount = 0;
    let highCount = 0;
    let significantCount = 0;
    newRecomandationModel.map((reco) => {
        console.log(reco.sdg_impact);
        if (reco.sdg_impact <= 1.5) {
            standardCount++;
        } else if (reco.sdg_impact > 1.5 && reco.sdg_impact <= 3) {
            highCount++;
        } else if(reco.sdg_impact > 3){
            significantCount++;
        }
    })
    let filtered = recomandation;
    if (filter === "standard") {
        filtered = filtered.filter((data) => data.sdg_impact <= 1.5);
    } else if (filter === "high") {
        filtered = filtered.filter((data) => data.sdg_impact > 1.5 && data.sdg_impact <= 3);
    } else if (filter === "significant") {
        filtered = filtered.filter((data) => data.sdg_impact > 3);
    }

    let styleUnactive = 'text-sm border rounded-2xl p-1 px-2 cursor-pointer';
    let styleActive = 'text-sm border rounded-2xl p-1 px-2 cursor-pointer bg-sky-100 text-black'
    return (
        <div className='hidden relative  overflow-y-scroll sm:overflow-y-hidden h-[652px] sm:flex flex-col items-center justify-between rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
            <div className='w-full bg-white z-[1000] flex items-center justify-between border-b p-4'>
                <div className='space-y-2'>
                    <h1 className='text-xl flex items-center font-bold'>Action Items<span><InfoButton text={tooltipText}></InfoButton></span></h1>
                    <div className='flex space-x-2'>
                        <button onClick={() => setFilter("total")} className={filter === "total" ? styleActive : styleUnactive}>Total({recomandation.length})</button>
                        <button onClick={() => setFilter("standard")} className={filter === "standard" ? styleActive : styleUnactive}>Standard({standardCount})</button>
                        <button onClick={() => setFilter("high")} className={filter === "high" ? styleActive : styleUnactive}>High({highCount})</button>
                        <button onClick={() => setFilter("significant")} className={filter === "significant" ? styleActive : styleUnactive}>Significant({significantCount})</button>
                    </div>
                </div>
                <div>
                    <Button variant="outlined" onClick={() => recomendationDocumentGenerator(filtered)}>
                        <DownloadIcon />
                    </Button>
                </div>
            </div>
            <div className='bg-white space-y-4 h-[100%] w-full p-4 flex flex-col items-start overflow-y-scroll'>
                {
                    filtered.map((reco, idx) => {
                        return <AlertBar main_topic={reco.topic} heading={reco.head_text} id={idx} />
                    })
                }
            </div>
        </div>
    )
}

export default ActionCard