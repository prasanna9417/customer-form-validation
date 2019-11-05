import React from 'react'
import '../style.css'
import validator from 'validator'

export default class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '', 
        email: '',
        password:'',
        mobile: '',
        address:'',
        errors:{
            name: '', 
            email: '',
            password:'',
            mobile: '',
            address:'',
        },
        formValid:false
      }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        let errors = this.state.errors;

        switch (name) {
            case 'name': 
                errors.name = 
                isNaN(value) 
                    ?   value.length < 5 ? 'Name must be 5 characters long!' : ''
                    : 'Name must be string'
                break;
            case 'email': 
                errors.email = 
                validator.isEmail(value) 
                    ? ''
                    : 'Email is not valid!';
                break;
            case 'password': 
                errors.password = 
                value.trim().length < 6
                    ? 'Password must be 6 characters long and no whitespaces allowed!'
                    : '';
                break;
            case 'mobile': 
                errors.mobile = 
                isNaN(value) 
                    ? 'mobile must number!'
                    : value.length < 10 ? 'mobile must 10 digit!' : ''
                break;
            case 'address': 
                errors.address = 
                value.length < 25
                    ? 'address should be atleast 25 characters long!'
                    : '';
                break;
            default:
                break;
    }

    this.setState({errors, [name]: value});
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        let valid
        if(this.state.name && this.state.email && this.state.password && this.state.mobile && this.state.address){
            valid = true
        }
        const errors= this.state.errors
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        )
        this.setState({formValid:valid},()=>{
            console.log(this.state.formValid)
        })

    }   
      
    render() {
      return (
        <div className='wrapper'>
            {
                this.state.formValid ? (
                    <div className='form-wrapper'>
                        <h2>Customer Details</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{this.state.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{this.state.email}</td>
                                </tr>
                                <tr>
                                    <th>Mobile</th>
                                    <td>{this.state.mobile}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{this.state.address}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='form-wrapper'>
                    <h2>Customer Form</h2>
                    <form onSubmit={this.handleSubmit}>
                      <div className='fullName'>
                        <label htmlFor="name">Name</label>
                        <input type='text' name='name' onChange={this.handleChange}/>
                        {this.state.errors.name.length > 0 && 
                        <span className='error'>{this.state.errors.name}</span>}
                      </div>
                      <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type='text' name='email' onChange={this.handleChange}/>
                        {this.state.errors.email.length > 0 && 
                        <span className='error'>{this.state.errors.email}</span>}
                      </div>
                      <div className='password'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' onChange={this.handleChange}/>
                        {this.state.errors.password.length > 0 && 
                        <span className='error'>{this.state.errors.password}</span>}
                      </div>
                      <div className='mobile'>
                        <label htmlFor="mobile">mobile</label>
                        <input type='text' name='mobile' onChange={this.handleChange}/>
                        {this.state.errors.mobile.length > 0 && 
                        <span className='error'>{this.state.errors.mobile}</span>}
                      </div>
                      <div className='address'>
                        <label htmlFor="address">Address</label>
                        <input type='text' name='address' onChange={this.handleChange}/>
                        {this.state.errors.address.length > 0 && 
                        <span className='error'>{this.state.errors.address}</span>}
                      </div>
                      <div className='submit'>
                        <button>Submit</button>
                      </div>
                    </form>
                  </div>
                )
            }
    
        </div>
      );
    }
  }