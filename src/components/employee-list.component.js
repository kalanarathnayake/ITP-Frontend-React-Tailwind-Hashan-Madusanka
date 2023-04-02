import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";
import EditEmployee from "./employee-edit.component";

const Employee = props => (
    <tr>
       
        <td>{props.employee.firstName}</td>
        <td>{props.employee.lastName}</td>
        <td>{props.employee.age}</td>
        <td>{props.employee.address}</td>
        <td>{props.employee.phone}</td>
        <td>{props.employee.dob.substring(0,10)}</td>
        <td>{props.employee.department}</td>
       
       
        <td>
            {/* <button ><Link to = {"/editInstructor/"+props.instructor._id } >Edit</Link></button> */}
            <button  onClick ={() => {props.gotoUpdateEmployee(props.employee._id)}  }>
                {/* <Link to = {"/editInstructor/"+props.instructor._id} classId={props.instructor._id}> */}
                {/* <InstructorEdit classId={props.instructor._id} key={props.instructor._id} /> */}
                    Update
                    {/* </Link> */}
                    </button>
            <button  onClick ={() => {props.deleteEmployee(props.employee._id)}}>Delete</button>
            
                                                        
                                                  
        </td>
    </tr>
)

export class EmployeeList extends Component {

    constructor(props){
        super(props);

        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.gotoUpdateEmployee = this.gotoUpdateEmployee.bind(this);

        this.state = {employee : [],
            searchEmployee : "",
        show:false};
    }


    componentDidMount() {
        this.refreshTable();
        }

        refreshTable() {
            axios.get('http://localhost:5100/api/employee/')
            .then(response => {
                this.setState({ employee : response.data })
            })
            .catch((error) => {
                console.log(error);
            })
            }
    
            gotoUpdateEmployee = (id) => {
                this.setState({
                    id: id,
                    show: true
                    
                })
                console.log("LIst id is :" +id);
            }

             //Modal box
    closeModalBox = () => {
        this.setState({show: false})
        this.refreshTable();
    }

        deleteEmployee(id){
            axios.delete('http://localhost:5100/api/employee/' +id)
            .then(res => console.log(res.data));
            this.setState({
                employee : this.state.employee.filter(el => el._id !== id)
            })
        }

        employeeList(){
            return this.state.employee.map(currentemployee => {
                return <Employee employee = {currentemployee} deleteEmployee = {this.deleteEmployee} gotoUpdateEmployee = {this.gotoUpdateEmployee
                } key = {currentemployee._id}/>;
            })
        }

    
        searchEmployeeList(){

            return this.state.employee.map((currentemployee) => {
                if (
                    this.state.searchEmployee ==
                    currentemployee.firstName

                ){
                    return (
                        <tr>
                       
                        <td style={{ width: "10%" }}>{currentemployee.firstName}</td>
                        <td style={{ width: "10%" }}>{currentemployee.lastName}</td>
                        <td style={{ width: "10%" }}>{currentemployee.age}</td>
                        <td style={{ width: "10%" }}>{currentemployee.address}</td>
                        <td style={{ width: "10%" }}>{currentemployee.phone}</td>
                        <td style={{ width: "10%" }}>{currentemployee.dob}</td>
                        <td style={{ width: "10%" }}>{currentemployee.department}</td>
                   
                        
                        
                        <td style={{ width: "20%" }}>
                            {
                            <button  onClick ={() => {this.gotoUpdateEmployee(currentemployee._id)}  }>
                                
                                Edit
                                
                            </button>
                            }
                            {"  "}
                            {
                            <button
                                
                                onClick={() => {
                                  //Delete the selected record
                                axios
                                    .delete(
                                    "http://localhost:5100/api/employee/" + currentemployee._id
                                    )
                                    .then(() => {
                                    alert("Delete Success");
                                      //Get data again after delete
                                    axios
                                        .get("http://localhost:5100/api/employee")
                                        .then((res) => {
                                        console.log(res.data);
                                        this.setState({
                                            instructor: res.data,
                                        });
                                        })
                                        .catch((err) => console.log(err));
                                    })
                                    .catch((err) => {
                                    alert(err);
                                    });
                                }}
                            >
                                Delete
                            </button>
                            }
                        </td>
                        </tr>
                    );
                }
            });
        }


        exportEmployee = () => {
            console.log( "Exporting PDF" )
    
    
            const unit = "pt";
            const size = "A4"; 
            const orientation = "landscape"; 
            const marginLeft = 40;
            const doc = new jsPDF( orientation, unit, size );
    
            const title = "Employee List Report ";
            const headers = [["First Name","Last Name","Age","Address","Phone","Date Of Birth","Department"]];
    
            const emp = this.state.employee.map(
                Employee=>[
                    Employee.firstName,
                    Employee.lastName,
                    Employee.age,
                    Employee.address,
                    Employee.phone,
                    Employee.dob.substring(0,10),
                    Employee.department,
                    
                   
                ]
            );
    
            let content = {
                startY: 50,
                head: headers,
                body:emp
            };
            doc.setFontSize( 20 );
            doc.text( title, marginLeft, 40 );
            require('jspdf-autotable');
            doc.autoTable( content );
            doc.save( "Employee-list.pdf" )
        }


    render() {
        return (
            <div >
            <div>
            
            
                <table >
                    <tr>
                        <th><h3>Employee List</h3></th>
                        <td><button ><Link to = {"/creatEmployee" }>Add Employee</Link></button>
                        <button onClick={() => this.exportEmployee()}>
                       
                        Download Report Here</button></td>
                    </tr>

                    <div >
                    <input style={{ width: "250px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by Employee First Name"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchEmployee: e.target.value
                        });
                    }}
                    />
            </div>
                </table>
            
            
                
                <table class="table table-bordered">
                <thead >
                    <tr>
                        
                        <th className = "tbhead">First Name</th>
                        <th className = "tbhead">Last Name</th>
                        <th className = "tbhead">Age</th>
                        <th className = "tbhead">Address</th>
                        <th className = "tbhead">Phone</th>
                        <th className = "tbhead">Date Of Birth</th>
                        <th className = "tbhead">Department</th>
                      
                        
                        
                        
                    </tr>
                </thead>
                <tbody>
                    { this.state.searchEmployee == "" ? this.employeeList() : this.searchEmployeeList() }
                </tbody>
            </table>
           
           
        </div>

          {/*--------------------------Model Box to Edit Conference--------------------------*/}

        <Modal show={this.state.show} onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Employee Details Update</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <EditEmployee classId={this.state.id} key={this.state.id} close={this.closeModalBox} />
                        
                    </Modal.Body>
                </Modal>

                  {/*----------------------------------------------------*/}

        </div>
        )
    }
}

