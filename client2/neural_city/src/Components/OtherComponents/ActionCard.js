import React, { useState } from 'react'
import AlertBar from '../Utility/AlertBar'
import { mockRecommendation } from '../../mockData/MapData';
import { Button } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph,TextRun } from "docx";

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
    const [filter, setFilter] = useState("total")
    const [recomandation, setRecomandations] = useState(mockRecommendation);
    let crticalCount = 0;
    let vulnerableCount = 0;
    let essentialCount = 0;
    mockRecommendation.map(reco => {
        if (reco.severity === "critical") {
            crticalCount++;
        } else if (reco.severity === "vulnerable") {
            vulnerableCount++;
        } else {
            essentialCount++;
        }
    })
    let filtered = recomandation;
    if (filter === "critical") {
        filtered = filtered.filter((data) => data.severity === "critical");
    } else if (filter === "vulnerable") {
        filtered = filtered.filter((data) => data.severity === "vulnerable");
    } else if (filter === "essential") {
        filtered = filtered.filter((data) => data.severity === "essential");
    }

    let styleUnactive = 'text-sm border rounded-2xl p-1 px-2 cursor-pointer';
    let styleActive = 'text-sm border rounded-2xl p-1 px-2 cursor-pointer bg-sky-100 text-black'
    return (
        <div className='relative h-[600px] md:w-[50%] w-[100%] flex flex-col items-center justify-between rounded-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
            <div className='w-full overflow-y-scroll sm:overflow-y-hidden bg-white z-[1000] flex items-center justify-between border-b p-4'>
                <div className=''>
                    <h1 className='text-2xl font-bold'>Action Items</h1>
                    <div className='flex space-x-2'>
                        <button onClick={() => setFilter("total")} className={filter === "total" ? styleActive : styleUnactive}>Total({recomandation.length})</button>
                        <button onClick={() => setFilter("critical")} className={filter === "critical" ? styleActive : styleUnactive}>Critical({crticalCount})</button>
                        <button onClick={() => setFilter("vulnerable")} className={filter === "vulnerable" ? styleActive : styleUnactive}>Vulnerable({vulnerableCount})</button>
                        <button onClick={() => setFilter("essential")} className={filter === "essential" ? styleActive : styleUnactive}>Essential/Desirable({essentialCount})</button>
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
                        return <AlertBar main_topic={reco.main_topic} heading={reco.heading} id={idx} />
                    })
                }
            </div>
        </div>
    )
}

export default ActionCard