import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GroupTableRow from './GroupTableRow';
import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

const rows = [
    {
        "sno": 1,
        "name": "XYZ Samaj",
        "description": "XYZ Samaj is a prominent community organization dedicated to fostering cultural exchange and social welfare within the community. With a rich history spanning over several decades, XYZ Samaj has been actively involved in organizing various cultural events, educational programs, and community outreach initiatives. The organization is committed to preserving and promoting the cultural heritage of the region while also addressing contemporary social issues. Under the dynamic leadership of Chairperson XYZ abc, XYZ Samaj continues to play a pivotal role in uniting people from diverse backgrounds and creating a sense of belonging. Through its dedicated members and volunteers, XYZ Samaj strives to make a positive impact and build a stronger, more inclusive community.",
        "chairperson": "XYZ abc",
        "peoples": [
            {
                "name": "XYZ",
                "email": "xyz@gmail.com",
                "mobile": "91400XXXXX",
                "address": "XYZ"
            },
            {
                "name": "abc",
                "email": "abc@gmail.com",
                "mobile": "94158XXXXX",
                "address": "abc"
            }
        ]
    },
    {
        "sno": 2,
        "name": "ABC Foundation",
        "description": "ABC Foundation is a leading non-profit organization dedicated to transforming lives through education. With a mission to empower underprivileged communities and break the cycle of poverty, ABC Foundation works tirelessly to provide access to quality education, resources, and support systems. The organization believes that education is the key to unlocking individual potential and creating lasting change in society. Led by Chairperson John Doe, ABC Foundation collaborates with schools, educators, and local communities to implement innovative programs and initiatives. By focusing on holistic development and lifelong learning, ABC Foundation aims to build a brighter future for all.",
        "chairperson": "John Doe",
        "peoples": [
            {
                "name": "Jane Smith",
                "email": "jane@example.com",
                "mobile": "1234567890",
                "address": "123 Main St"
            },
            {
                "name": "James Johnson",
                "email": "james@example.com",
                "mobile": "9876543210",
                "address": "456 Elm St"
            }
        ]
    },
    {
        "sno": 3,
        "name": "Community Care Group",
        "description": "Community Care Group is a grassroots organization committed to providing compassionate care and support to elderly individuals in our local communities. Our dedicated team of volunteers works tirelessly to address the unique needs and challenges faced by seniors, ensuring they feel valued, respected, and included. Through a range of services, including home visits, social activities, and assistance with daily tasks, we strive to enhance the quality of life for our elderly neighbors. Led by Chairperson Emily Brown, Community Care Group embodies the spirit of community and demonstrates the power of kindness and empathy in making a meaningful difference in the lives of others.",
        "chairperson": "Emily Brown",
        "peoples": [
            {
                "name": "Michael Davis",
                "email": "michael@example.com",
                "mobile": "5556667777",
                "address": "789 Oak St"
            },
            {
                "name": "Sarah Wilson",
                "email": "sarah@example.com",
                "mobile": "3334445555",
                "address": "101 Pine St"
            }
        ]
    },
    {
        "sno": 4,
        "name": "Environmental Alliance",
        "description": "Environmental Alliance is a dynamic coalition of passionate individuals and organizations dedicated to protecting our planet and promoting environmental sustainability. With the urgent need to address climate change and protect biodiversity, our alliance advocates for policy change, conducts educational outreach, and engages in direct action to preserve natural habitats and mitigate environmental degradation. Led by Chairperson Adam Green, Environmental Alliance is committed to fostering a more harmonious relationship between humanity and nature, ensuring a healthier and more resilient planet for future generations.",
        "chairperson": "Adam Green",
        "peoples": [
            {
                "name": "Laura Anderson",
                "email": "laura@example.com",
                "mobile": "5551234567",
                "address": "456 Park Ave"
            },
            {
                "name": "Robert Thompson",
                "email": "robert@example.com",
                "mobile": "5559876543",
                "address": "789 Lake St"
            }
        ]
    },
    {
        "sno": 5,
        "name": "Youth Empowerment League",
        "description": "Youth Empowerment League is a vibrant organization dedicated to empowering young people through education, leadership development, and community engagement. Recognizing the immense potential of youth as agents of positive change, we provide opportunities for skill-building, mentorship, and advocacy to foster personal growth and social impact. Led by Chairperson Sophia Carter, Youth Empowerment League is committed to nurturing the next generation of leaders and change-makers, equipping them with the tools and resources they need to thrive and make a difference in their communities and beyond.",
        "chairperson": "Sophia Carter",
        "peoples": [
            {
                "name": "David Martinez",
                "email": "david@example.com",
                "mobile": "5552223333",
                "address": "321 Elm St"
            },
            {
                "name": "Jennifer Lee",
                "email": "jennifer@example.com",
                "mobile": "5554445555",
                "address": "654 Oak St"
            }
        ]
    },
    {
        "sno": 6,
        "name": "Healthcare for All",
        "description": "Healthcare for All is a grassroots movement dedicated to advocating for universal access to quality healthcare services. With the belief that healthcare is a fundamental human right, we work tirelessly to promote policies and initiatives that ensure equitable and affordable healthcare for all individuals, regardless of their socio-economic status. Led by Chairperson Mark Wilson, Healthcare for All mobilizes community members, healthcare professionals, and advocates to champion systemic change and address healthcare disparities, ultimately striving to create a healthier, more just society for everyone.",
        "chairperson": "Mark Wilson",
        "peoples": [
            {
                "name": "Maria Rodriguez",
                "email": "maria@example.com",
                "mobile": "5557778888",
                "address": "789 Maple Ave"
            },
            {
                "name": "Daniel Brown",
                "email": "daniel@example.com",
                "mobile": "5558889999",
                "address": "123 Oak St"
            }
        ]
    },
    {
        "sno": 7,
        "name": "Animal Rights Coalition",
        "description": "Animal Rights Coalition is a dedicated group of individuals working tirelessly to promote animal welfare and end cruelty towards animals. With a strong belief in the inherent value and dignity of all living beings, we advocate for the protection of animals from exploitation, abuse, and neglect. Through education, outreach, and advocacy efforts, we raise awareness about animal rights issues and work to enact meaningful change in laws and policies. Led by Chairperson Emma Taylor, Animal Rights Coalition is committed to creating a more compassionate and ethical world for animals and humans alike.",
        "chairperson": "Emma Taylor",
        "peoples": [
            {
                "name": "Christopher Wright",
                "email": "chris@example.com",
                "mobile": "5556667777",
                "address": "456 Pine St"
            },
            {
                "name": "Olivia Moore",
                "email": "olivia@example.com",
                "mobile": "5553334444",
                "address": "789 Cedar St"
            }
        ]
    },
    {
        "sno": 8,
        "name": "Tech Innovators Society",
        "description": "Tech Innovators Society is a dynamic community of innovators, entrepreneurs, and tech enthusiasts dedicated to driving innovation and fostering collaboration in the technology sector. With a focus on cutting-edge technologies and emerging trends, we provide a platform for idea exchange, networking, and skill development to empower individuals to realize their full potential and create impactful solutions. Led by Chairperson Andrew Johnson, Tech Innovators Society is at the forefront of driving technological advancement and shaping the future of the industry.",
        "chairperson": "Andrew Johnson",
        "peoples": [
            {
                "name": "Matthew White",
                "email": "matthew@example.com",
                "mobile": "5551112222",
                "address": "321 Maple St"
            },
            {
                "name": "Ava Garcia",
                "email": "ava@example.com",
                "mobile": "5557778888",
                "address": "654 Elm St"
            }
        ]
    },
    {
        "sno": 9,
        "name": "Community Garden Association",
        "description": "Community Garden Association is a grassroots organization dedicated to promoting community gardening and sustainable food practices. With a mission to cultivate a culture of urban agriculture and environmental stewardship, we provide resources, education, and support to individuals and communities interested in growing their own food and connecting with nature. Led by Chairperson Sophie Wilson, Community Garden Association fosters community engagement, food security, and environmental sustainability through the power of gardening.",
        "chairperson": "Sophie Wilson",
        "peoples": [
            {
                "name": "Ethan Clark",
                "email": "ethan@example.com",
                "mobile": "5554443333",
                "address": "123 Cedar St"
            },
            {
                "name": "Mia Baker",
                "email": "mia@example.com",
                "mobile": "5558887777",
                "address": "456 Oak St"
            }
        ]
    },
    {
        "sno": 10,
        "name": "Cultural Diversity Network",
        "description": "Cultural Diversity Network is a dynamic organization dedicated to celebrating and promoting cultural diversity and inclusion. With a commitment to fostering understanding, respect, and appreciation for diverse cultures, we organize cultural events, educational programs, and intercultural exchanges to bridge divides and build stronger, more inclusive communities. Led by Chairperson David Garcia, Cultural Diversity Network is a beacon of unity and collaboration, bringing people together to embrace the richness of human diversity and create a more harmonious world.",
        "chairperson": "David Garcia",
        "peoples": [
            {
                "name": "Liam Perez",
                "email": "liam@example.com",
                "mobile": "5559998888",
                "address": "789 Pine St"
            },
            {
                "name": "Chloe Hall",
                "email": "chloe@example.com",
                "mobile": "5553332222",
                "address": "101 Elm St"
            }
        ]
    }
]



export default function GroupTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Sr. No.</TableCell>
                        <TableCell align="center">Group Name</TableCell>
                        <TableCell align="center">Chair Person</TableCell>
                        <TableCell align="center">Message</TableCell>
                        <TableCell align="center">Request Support</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <GroupTableRow key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
