import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {Row,Col,Container,Card} from 'react-bootstrap';
import './css/Ghost1.css';

function Linkspage() {
    const [mydata,setMydata]=useState([]);
    const [extLinks,setexternalLinks]=useState([]);
    const [intLinks,setinternalLinks]=useState([]);
    var dataLinks=[]
    var externalLinks=[];
    var internalLinks = [];

    const getPosts=()=>{
        axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d').then((response)=>{
            var fnldata=response.data.posts;
            
            fnldata.filter(x=>{
                dataLinks.push(x.feature_image)
                dataLinks.push(x.url)
                if(x.feature_image.includes('ghost-blog.ipxp.in')){
                    internalLinks.push(x.feature_image)
                }
                else{
                    externalLinks.push(x.feature_image)
                }
                if(x.url.includes('ghost-blog.ipxp.in')){
                    internalLinks.push(x.url)
                }
                else{
                    externalLinks.push(x.url)
                }
                
            })
           setMydata(dataLinks) 
           setexternalLinks(externalLinks)
           setinternalLinks(internalLinks)
            
        }).catch((error)=>{
          console.log(error)
        })
    }

 

    useEffect(()=>{
        
        getPosts()
       },[])
    return (
        <Container>
            <Row>
            <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Number of Total Links in All Posts</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    <ul>
                    {
                    (mydata.length===0)?<p>Total links not found</p>:
                    mydata.map((item,index)=><li key={index}>{item}</li>)
                    }
                    </ul>
                    </Card.Subtitle>
                    
                    </Card.Body>
                    </Card> 
            </Col>                 
            
            <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Number of External Links</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    <ul>
                    {
                    (extLinks.length===0)?<p>External links not found</p>:
                    extLinks.map((item,index)=><li key={index}>{item}</li>)
                    }
                   </ul>
                    </Card.Subtitle>
                    
                    </Card.Body>
                    </Card>     
            </Col>

            <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Number of Internal Links</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    <ul>
                     {
                    (intLinks.length===0)?<p>Internal links not found</p>:
                    intLinks.map((item,index)=><li key={index}>{item}</li>)
                     }
                   </ul>
                    </Card.Subtitle>
                    
                    </Card.Body>
                    </Card>       
            
           
            </Col>
            </Row>
           

            
        </Container>
    )
}

export default Linkspage
