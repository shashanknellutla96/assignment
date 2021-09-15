import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Row,Col,Container,Card} from 'react-bootstrap';
import './css/Ghost1.css';

function Postspage() {

    const [mydata,setMydata]=useState([]);
    const [mydata1,setMydata1]=useState([]);
    const [mydata2,setMydata2]=useState([]);
    const [mydata3,setMydata3]=useState([]);
    const [mydata4,setMydata4]=useState([]);
    const [mydata5,setMydata5]=useState([]);

    var filteredData=[];
    var filteredData1=[];
    var filteredData2=[];
    var filteredData3=[];
    var filteredData4=[];
    var filteredData5=[];
    
    // var str1= "<p>Before we deep dive into the different deployment strategies that you should consider for your product, let's first understand what is a need for a smooth and fully functional deployment strategy.</p><p>With this rapidly changing user behavior and evolving products, companies must keep up with the market demands. DevOps here plays a crucial role in avoiding last-minute failures and downtime. To keep the users away from any negative impacts, engineers have been trying different deployment strategies for a smooth and effortless product release.</p><p>In this article, we will discuss eight distinct types of software deployment strategies. Every strategy comes with its own pros and cons which may also vary from company to company.</p><p>Let's begin our journey to understand when and where a particular strategy is used in application deployment.</p><h3 id=\"basic-deployment\">Basic Deployment</h3><p>It is considered one of the riskiest strategies of all as in Basic deployment, all nodes are updated at the same time with a new service or latest artifact version. It makes the rollback process very tedious.</p><p><strong>Pros</strong></p><ol><li>It is fast, simple, and cheap.</li><li>Can be used if your application is not business or revenue critical.</li><li>Can be considered if your application is not in use or you are deploying it during the off-hours.</li></ol><p><strong>Cons</strong></p><ol><li>It is difficult to roll back to the previous version.</li><li>It is not outage-proof and falls into the riskiest category.</li></ol><h3 id=\"multi-service-deployment\">Multi-Service Deployment</h3><p>It is also one of the riskiest deployment strategies. It is used when the target environment is updated with multiple new services all at the same time. It comes in handy when applications have service or version dependency. If you are using this strategy it is recommended to do it in the off-hours or when your application is not in use.</p><p><strong>Pros</strong></p><ol><li>This strategy is fast, simple, and cheap as well.</li><li>Not as risk prone as Basic Deployment.</li></ol><p><strong>Cons</strong></p><ol><li>It makes the rollback process slow and is not outage-proof.</li><li>With this strategy managing, testing, and verifying all services is difficult.</li></ol><h3 id=\"recreate-deployment-strategy\">Recreate Deployment Strategy</h3><p>It is one of the basic ways of deployment in which the older version is completely shut down and then the updated version is made live. It brings huge downtime with it and can only be used when your application availability is not a major concern.</p><p><strong>Pros</strong></p><ol><li>It doesn't require a load balancer.</li><li>Engineers get more time to complete the process.</li></ol><p><strong>Cons </strong></p><ol><li>The downtime of the application will be based on the reboot time and the disk writing speed.</li><li>Users will be impacted in real-time.</li></ol><h3 id=\"rolling-deployment\">Rolling Deployment</h3><p>It updates the running instances of an application with the new release. Nodes are updated incrementally with the service or artifact version in integer N batches.</p><p><strong>Pros</strong></p><ol><li>Simpler to roll back.</li><li>Less risky than Basic Deployment.</li><li>Easy Implementation.</li></ol><p><strong>Cons</strong></p><ol><li>Nodes are updated in batches hence services should support both old and new versions.</li><li>Since the deployment is happening incrementally, it makes the verification and the deployment process slow.</li></ol><h3 id=\"blue-green-deployment\">Blue-Green Deployment</h3><p>It utilizes two identical environments, one Blue and another one is Green, and both are running parallelly in the production environment. Load Balancer can be used to switch the traffic from the old-Blue version to the new-Green version instantly.</p><p>Both the Blue and Green versions are available on the production, in case something went wrong, the Load Balancer can instantly switch traffic back to the old-Blue environment.</p><p><strong>Pros</strong></p><ol><li>It is simple, fast, and easy to implement.</li><li>Instant rollback.</li><li>Not risky compared to other deployment strategies.</li></ol><p><strong>Cons</strong></p><ol><li>High Infra Costs.</li><li>It can become complex and expensive to replicate the production environment.</li></ol><p>Read more about the working of Blue-Green Deployments in the below article.</p><figure class=\"kg-card kg-bookmark-card\"><a class=\"kg-bookmark-container\" href=\"http://143.244.136.65:2368/all-you-need-to-know-about-blue-green-deployments/\"><div class=\"kg-bookmark-content\"><div class=\"kg-bookmark-title\">All you Need to Know about Blue-Green Deployment Strategy</div><div class=\"kg-bookmark-description\">Blue-Green Deployment is an application release model which can reduce downtime and risk by running two identically configured production environments.</div><div class=\"kg-bookmark-metadata\"><img class=\"kg-bookmark-icon\" src=\"http://143.244.136.65:2368/favicon.png\" alt=\"\"><span class=\"kg-bookmark-author\">DevOps Blog - VegaStack</span><span class=\"kg-bookmark-publisher\">Simran Malhotra</span></div></div><div class=\"kg-bookmark-thumbnail\"><img src=\"http://143.244.136.65:2368/content/images/2021/07/All-you-Need-to-Know-about-Blue-Green-Deployments-4.png\" alt=\"\"></div></a></figure><h3 id=\"canary-deployment\">Canary Deployment</h3><p>It involves slowly rolling out the changes to a subset of users instead of rolling them to all the users at once, this approach makes it one of the safest deployment strategies. </p><p>As a subset of users is targeted, deployment can be analyzed thoroughly to assess if it is ready to be incrementally (slower) rolled out to the other sets of users. In case of any issue occurs, the deployment can be rolled back easily, for troubleshooting.</p><p><strong>Pros</strong></p><ol><li>Faster rollback process.</li><li>Provides more flexibility to developers to test the new feature and make them 100% sure to deploy the application for all the users.</li><li>It is much cheaper than blue-green deployments there is no need for two production environments.</li></ol><p><strong>Cons</strong></p><ol><li>The deployment cycle is much longer and slower.</li><li>Scripting of canary release is complex and hence is time-consuming.</li></ol><h3 id=\"ab-testing\">A/B Testing</h3><p>A/B Testing is a statistically motivated deployment strategy, different versions of the same service are run simultaneously, and data is gathered over a period which helps to decide if the updated version is good to go or not. </p><p>In A/B Testing user data is routed based on many factors like their demographics, user type, free/paid plan users, etc. </p><p><strong>Pros</strong></p><ol><li>Multiple versions can be tested at the same time with the help of different A/B testing tools.</li><li>Routing decisions are based on real-time user data.</li></ol><p><strong>Cons</strong></p><ol><li>There is a requirement for an expensive and complex Load Balancer.</li><li>The experimental nature of this deployment can sometimes break the application.</li></ol><h3 id=\"shadow-deployment-strategy\">Shadow Deployment Strategy</h3><p>In shadow deployment, the previous version is present parallelly with the updated version, and a fork version of the traffic is routed towards the updated version for testing. Once the traffic and load testing are completed successfully, the updated version is then deployed to the production.</p><p>It is one of the complex strategies as SREs must maintain two versions and need to take care of the duplicate requests that are getting generated with the forked traffic.</p><p><strong>Pros</strong></p><ol><li>Accurate performance and stability tests.</li><li>No impact on the users.</li></ol><p><strong>Cons</strong>  </p><ol><li>It is expensive as it requires double resources.</li><li>Setting it up is complex.</li><li>Higher infrastructure costs.</li></ol><h3 id=\"how-to-decide-which-deployment-strategy-to-use\">How to Decide which Deployment Strategy to Use?</h3><p>Now that you are aware of several types of Deployment Strategies, how can you decide which strategy you should follow? This depends on your application type and your target customers and environments.</p><p>We have gathered data, automating hundreds of product deployments. Companies prefer Blue-Green Deployments or Canary Deployments for critical application deployments. It is also quite common for teams to create a strategy by combining a lot of different strategies mentioned in this article.</p>" ;

    // console.log(str1.length)

   const getPosts=()=>{ axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d')
        .then((response)=>{
            //console.log(response.data.posts)
             var fnldata=response.data.posts;
             fnldata.filter(x=>{
                 //console.log(x)
                 if(x.meta_description===null){
                     filteredData.push(x.title);
                 }
                 
                 else if(x.meta_description.length>100){
                    filteredData1.push(x.meta_description);
                 }
                   if(x.url.length>50){
                     filteredData2.push(x.url);
                 }

                  if(x.feature_image===''){
                    filteredData3.push(x.title);
                    
                }

                if(x.html.length<250){
                    filteredData4.push(x.title);
                }

                if(x.html.length>1500){
                    filteredData5.push(x.title);
                }
                 
                 
            })
            console.log(filteredData4)
        //    filteredData=fn1data;
           setMydata(filteredData)
           setMydata1(filteredData1)
           setMydata2(filteredData2)
           setMydata3(filteredData3)
           setMydata4(filteredData4)
           setMydata5(filteredData5)


           
        })
        .catch((err)=>{
            console.log(err)
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
                    <Card.Title>List of Posts without Meta Description</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"> <ul>
                    {
                     (mydata.length===0)?<p>No posts found</p>:
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
                    <Card.Title>Too long meta description</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    <ul>
                     {       
                     (mydata1.length===0)?<p>Too long meta desctiption not found</p>:
                     mydata1.map((item,index)=><li key={index}>{item}</li>)
                    }

                     </ul> 
                    </Card.Subtitle>
                    
                    </Card.Body>
                    </Card>      
             
             
             </Col>
             <Col md={4} >

                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Too long URL, more than 50 chars</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    <ul>
                     {
                     (mydata2.length===0)?<p>Too long URL not found</p>:
                     mydata2.map((item,index)=><li key={index}>{item}</li>)
                    }

                     </ul>
                    </Card.Subtitle>
                    
                    </Card.Body>
                    </Card>        
            </Col>
            </Row>


             <Row>
             <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>List of posts without featured image</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    <ul>
                    {    
                     (mydata3.length===0)?<p>No featured image found</p>:
                     mydata3.map((item,index)=><li key={index}>{item}</li>)
                    }
                     </ul>
                    </Card.Subtitle>
                    
                    </Card.Body>
                    </Card>         
            
             
             </Col>
             <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Too Short Posts, Below 250 words</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    <ul>
                    {
                     (mydata4.length===0)?<p>Too short posts not found</p>:
                     mydata4.map((item,index)=><li key={index}>{item}</li>)
                     }
                    </ul>
                    </Card.Subtitle>
                    
                    </Card.Body>
                    </Card>      
             
             
             </Col>
             <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Too Long Posts, More than 1500 words</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    <ul>
                    {
                    (mydata5.length===0)?<p>Too long posts not found</p>:
                     mydata5.map((item,index)=><li key={index}>{item}</li>)
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


export default Postspage
