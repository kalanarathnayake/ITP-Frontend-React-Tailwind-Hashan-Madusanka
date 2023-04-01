import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";

export class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        this.onChangeempfirstName = this.onChangeempfirstName.bind(this);
        this.onChangeemplastName = this.onChangeemplastName.bind(this);
        this.onChangeempage = this.onChangeempage.bind(this);
        this.onChangeempaddress = this.onChangeempaddress.bind(this);
        this.onChangeempphone = this.onChangeempphone.bind(this);
        this.onChangeempdob = this.onChangeempdob.bind(this);
        this.onChangeempdepartment = this.onChangeempdepartment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // firstName lastName age address phone dob department

        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            address: '',
            phone: '',
            dob: '',
            department: ''
        }
    }

    onChangeempfirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeemplastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeempage(e) {
        this.setState({
            age: e.target.value
        });
    }

    onChangeempaddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeempphone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeempdob(e) {
        this.setState({
            dob: e.target.value
        });
    }

    onChangeempdepartment(e) {
        this.setState({
            department: e.target.value
        });
    }

    // demoClicked(){
    //     this.setState({
    //         fullName : "Gihan Perera",
    //         nic : "931524475V",
    //         empID : 32984,
    //         dob : new Date(),
    //         designation : "Labour",
    //         section : "Equipment",
    //         address : "Gampaha",
    //         contactNo : 77564213,
    //         emergency : 76124321,


    //     })
    // }

    onSubmit(e) {
        e.preventDefault();

        const employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            address: this.state.address,
            phone: this.state.phone,
            dob: this.state.dob,
            department: this.state.department,
        }

        console.log(employee);

        // if(this.state.empID.length < 0){
        //     this.setState({empIDError : "Employee ID should be longer than 0 characters."})
        // }
        // if(this.state.fullName.length < 6){
        //     this.setState({nameError : "Name should be longer than 6 characters."})
        // }
        // if(this.state.contactNo.length != 10){
        //     this.setState({contactNoError : "Contact Number is invalid."})
        // }

        // else if(this.state.fullName.length >= 10  && this.state.empID.length == 4)
        // {
        axios.post('http://localhost:5000/employee/', employee)
            // .then(res => console.log("success")).catch(err=>console.log(err));

            .then(res => {

                console.log(res);

                if (res.status === 200) {
                    this.clearData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Classroom has been added!!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in adding!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#e00404'
                    })
                }
            })
        window.location = '/employee';
    }

    clearData = () => {
        this.setState({
            empID: '',
            fullName: '',
            contactNo: '',
            email: '',
            address: '',
            position: ''
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase'>
                                                Add Employee
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Employee ID : </label>
                                                    <input type="text"
                                                        required
                                                        className="form-control "
                                                        value={this.state.empID}
                                                        onChange={this.onChangeempID}
                                                    />
                                                    <p className="validateMsg">{this.state.empIDError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Full Name : </label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.fullName}
                                                        onChange={this.onChangefullName}
                                                    />
                                                    <p className="validateMsg">{this.state.nameError}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Contact Number : </label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.contactNo}
                                                        onChange={this.onChangecontactNo}
                                                    />
                                                    <p className="validateMsg">{this.state.contactNoError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Eamil : </label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.email}
                                                        onChange={this.onChangeemail}
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className = "form-group">
                                            <label>DOB : </label>
                                            <div>
                                                <DatePicker
                                                selected = {this.state.dob}
                                                onChange = {this.onChangedob}
                                                />
                                            </div>
                                            </div> */}

                                            <div className="form-group">
                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Address : </label>
                                                <textarea type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.address}
                                                    onChange={this.onChangeaddress}
                                                /><p> </p>
                                            </div>
                                            <div className="form-group ">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">Position : </label>
                                                <select type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.position}
                                                    onChange={this.onChangeposition}
                                                >
                                                    <option>Waiter Staff</option>
                                                    <option>Kitchen Head Chef</option>
                                                    <option>Inventory Manager</option>
                                                    <option>Driver</option>
                                                    <option>Delivery Manager</option>
                                                    <option>Employee Manager</option>
                                                    <option>Finantial Manager</option>
                                                    <option>Product Manager</option>
                                                </select><p />
                                            </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Employee" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}