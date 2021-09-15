import React, { Component } from 'react'
import axios from 'axios';
import {Row,Col,Container,Card} from 'react-bootstrap';
import './css/Ghost1.css';




class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            tagsCount:'',
            authorsCount:'',
            pagesCount:'',
            postsCount:'',
            latestPosts:[],
            errorMsg:''
           
        }
    }

    componentDidMount(){
        
        this.getPosts()
        this.getPages()
        this.getAuthors()
        this.getTags()
        
        
       }
       //https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062
       
       getPosts=()=>{
           axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d').then(response=>{
               //console.log(response.data.posts.length)
               let count=response.data.posts.length
               let postarray=response.data.posts
               //console.log(postarray.slice(count-5,count))
               
               this.setState({
                   
                postsCount:response.data.posts.length,
                latestPosts:postarray.slice(count-5,count)
               })
            }).catch(error=>{this.setState({
            errorMsg:"sorry! something went wrong"
           })
               
           })
       }

       getPages=()=>{
        axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/pages/?key=8196190b08906dda0ebf6e6f5d').then(response=>{
            //console.log(response.data.pages.length)
            this.setState({
                pagesCount:response.data.pages.length,
             
            })
            }).catch(error=>{this.setState({
         errorMsg:"sorry! something went wrong"
        })
            
        })
        }

        getAuthors=()=>{
            axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/authors/?key=8196190b08906dda0ebf6e6f5d').then(response=>{
                //console.log(response.data.pages.length)
                this.setState({
                    authorsCount:response.data.authors.length,
                 
                })
                }).catch(error=>{this.setState({
             errorMsg:"sorry! something went wrong"
            })
                
            })
            }

        getTags=()=>{
                axios.get('https://ghost-blog.ipxp.in/ghost/api/v3/content/tags/?key=8196190b08906dda0ebf6e6f5d').then(response=>{
                    //console.log(response.data.pages.length)
                    this.setState({
                        tagsCount:response.data.tags.length,
                     
                    })
                    }).catch(error=>{this.setState({
                 errorMsg:"sorry! something went wrong"
                })
                    
                })
                }
                
    render() {
        return (
             <Container>
                <Row > 
                <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Total number of posts</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.state.postsCount}</Card.Subtitle>
                    
                    </Card.Body>
                    </Card> 
                      
                </Col>
                <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Total number of Pages</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.state.pagesCount}</Card.Subtitle>
                    
                    </Card.Body>
                    </Card> 
                </Col>  

                <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Total number of Authors</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.state.authorsCount}</Card.Subtitle>
                    
                    </Card.Body>
                    </Card> 
                      
                </Col>
                    
                </Row>

                <Row> 
                <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Total number of Tags</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.state.tagsCount}</Card.Subtitle>
                    
                    </Card.Body>
                    </Card> 
                    
                </Col>
                   
                <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Latest 5 published posts title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><ol>{this.state.latestPosts.map((item,index)=><li key={index}>
                      {item.title}
                    </li>)}</ol></Card.Subtitle>
                    
                    </Card.Body>
                    </Card>     
                </Col>
                    
                <Col md={4} >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Posts per month</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    
                    </Card.Body>
                    </Card> 
                </Col>  
                    
                </Row>
                
            </Container>
        )
    }
}

export default Dashboard
