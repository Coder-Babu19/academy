import './Register.css'
import { useState } from 'react';
import { Modal , Button, Form} from 'react-bootstrap';
import axios from "axios"






const Register = () => {

    const [name, setName] = useState('');
    const [gender, setGender] = useState('Male');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [mode, setMode] = useState('Home Tuition');
    const [board, setBoard] = useState('O level');
    const [grade, setGrade] = useState('Grade 1');
    const [hours, setHours] = useState(1);
    const [days, setDays] = useState(1);
    const [specificDays, setSpecificDays] = useState('No');
    const [specificDaysList, setSpecificDaysList] = useState([]);
    const [fees, setFees] = useState(0);
    const [subjects, setSubjects] = useState([]);

    
    const [show, setShow] = useState(false);
    const [submitResponce, setSubmitResponce] = useState('')
    const [submitStatus, setSubmitStatus] = useState('')
    const [subjectNotSelected, setSubjectNotSelected] = useState(true);

    const courses = ['Maths','Science','History', 'Geography', 'Add Maths', 'Physics', 'Chemistry', 'Accounts','Business Studies',
                     'Urdu','English Literature', 'English Language', 'Biology','Computer Science', 'ECAT', 'MCAT']

    
    const handleClose = () => {
        setShow(false)
        
        if (submitStatus !== "Submission Failed"){
        window.location.reload(); 
        }
    }




    const handleSubmit = async (e) => {

        const form = e.currentTarget;

        if (form.checkValidity() !== false){

        e.preventDefault();
        console.log("VALIDATION SUCCESS")
    


        if ( specificDays === 'No'){
            let day = specificDaysList
            while (day.length) {
                day.pop();
            }
            setSpecificDaysList(day)
        }

        const data = {
            Name : name,
            Gender : gender,
            Email : email,
            Phone_Number : contact,
            Teaching_Mode : mode,
            Board : board,
            Grade : grade,
            Hours_Per_Day : parseInt(hours),
            Days : parseInt(days),
            Specific_Days : specificDays,
            Specific_Days_List : specificDaysList,
            Subjects : subjects,
            Expected_Fees : parseInt(fees)
        }

        
        try {
                    await axios.post("/sendData", {
                    data
                })
            .then((responce) => {
                if (responce.data === 'Success'){
                    setSubmitResponce("Wooho! You are Registered!!!")
                    setSubmitStatus("Submission Successful")
                }
                else{
                    setSubmitResponce("A technical issue has been occured")
                    setSubmitStatus("Submission Failed")
                }
            })
            } catch (error) {
                console.error(error)
        }

        setShow(true);
    }

    else{
  
        e.preventDefault();
        e.stopPropagation();
        console.log("VALIDATION FaILED")
    }
        
        
    }

    const handleDays = (e) =>{
        setDays(e.target.value)
        let day = specificDaysList
        let x = []

        for (let i = 0; i < e.target.value; i++){
            if (day[i] === "Monday" || day[i] === "Tuesday" || day[i] === "Wednesday" || day[i] === "Thursday" || day[i] === "Friday" || day[i] === "Saturday" || day[i] === "Sunday"){
            x[i] = day[i]
            }
            else{
                x[i] = "Monday"
            }
        }
        setSpecificDaysList(x)
    }

    const handleSpecificClick = () =>{

        if (specificDays === 'No'){
            setSpecificDays('Yes')

            if (specificDaysList.length === 0){
             setSpecificDaysList(["Monday"])
            }
        }
        else{
            setSpecificDays('No')
        }
    }


    const updateSpecificDays = (e,index) => {

        let days = specificDaysList
        days[index] = e.target.value
        setSpecificDaysList(days)

    }

    const createSelectItems = () => {
        let items = [];       

        for (let i = 0; i < days; i++) {      
             items.push(
            <div key={i} className='row'>
            <div className='col-md-1 align-self-center'>
             <label className="text-light pt-2" htmlFor="studyDays">Day {i+1}</label>
            </div>
            <div className='col-md-2 mb-2'>
             <select id="studyDays" onChange = {(e) => updateSpecificDays(e,i)} className="custom-select mr-sm-2"> 
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
             </select>
             </div>
             </div>
             );
        }
        return items;
    } 


    const handleSubject = (subj) => {
        
        let newSubjects = subjects
        let ind = newSubjects.indexOf(subj)

        if(ind === -1){
            newSubjects.push(subj)
        }
        else{
            newSubjects.splice(ind, 1); 
        }

        setSubjects(newSubjects)

        if (subjects.length !== 0){
            setSubjectNotSelected(false)
        }
        else {
            setSubjectNotSelected(true)
        }
    }

  return (

        <div className='Container needs-validation' noValidate>

            <form onSubmit={handleSubmit}>
                <h3 className='text-light'>Personal Info</h3>
                <div className='form-row mb-5 mt-2'>
    
                    <div className='col-md-3 pr-3'>
                        <div className="form-group">
                            <label className="text-light" htmlFor="InputName">First Name (Alphabets Only)</label>
                            <input type = "text" className="form-control" id="InputName" maxLength={25} pattern="[a-zA-Z]+" placeholder="Your Name" value = {name} onChange={(e) => setName(e.target.value)} required/>
                        </div>
                    </div>

                    <div className='col'>
                            <div className='row'>
                                <label className="text-light" htmlFor="InputName">Gender</label>
                                <div className='col mt-2 mb-3'>
                                    <div className="custom-control custom-radio custom-control-inline text-light">
                                    <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" onChange={(e) => setGender("Male")} defaultChecked/>
                                    <label className="custom-control-label" htmlFor="customRadioInline1">Male</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline text-light">
                                    <input type="radio" id="customRadioInline2" name="customRadioInline1" onChange={(e) => setGender("Female")} className="custom-control-input"/>
                                    <label className="custom-control-label" htmlFor="customRadioInline2">Female</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline text-light">
                                    <input type="radio" id="customRadioInline3" name="customRadioInline1" onChange={(e) => setGender("Other")} className="custom-control-input"/>
                                    <label className="custom-control-label" htmlFor="customRadioInline3">Other</label>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div className='col-md-3 pr-3'>
                        <div className="form-group">
                            <label className="text-light" htmlFor="InputEmail">Email</label>
                            <input type="email" className="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" id="InputEmail" placeholder="Your email" value={email} onChange = {(e) => setEmail(e.target.value)} required/>
                        </div>
                    </div>
                    <div className='col-md-3 pr-3'>
                        <div className="form-group">
                            <label className="text-light" htmlFor="InputContact">Contact (03xxxxxxxxxx)</label>
                            <input type="text" className="form-control" pattern="03[0-9]*.{9,9}" maxLength={11} id="InputContact" placeholder="Your Phone Number" value={contact} onChange = {(e) => setContact(String(e.target.value))} required/>
                        </div>
                    </div>

                </div>
                


                <h3 className='text-light'>Tuition Details</h3>
                <div className='row mt-2'>
                    <div className='col-md-3'>
                        <div className="form-group">
                            <label className="text-light" htmlFor="InputMode">Mode</label>
                            <select id="InputMode" onChange = {(e) => setMode(e.target.value)} className="custom-select mr-sm-2">
                            <option defaultChecked>Home Tuition</option>
                            <option>Coaching Center</option>
                            <option>Online</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="form-group">
                            <label className="text-light" htmlFor="InputBoard">Board</label>
                            <select id="InputBoard" onChange = {(e) => setBoard(e.target.value)} className="custom-select mr-sm-2">
                            <option defaultChecked>O level</option>
                            <option>Metric</option>
                            <option>Intermediate</option>
                            <option>A level</option>
                            <option>Agha Khan</option>
                            <option>Edexcel</option>
                            <option>IGCSE</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="form-group">
                            <label className="text-light" htmlFor="inputGrade">Class/Grade</label>
                            <select id="inputGrade" onChange = {(e) => setGrade(e.target.value)} className="custom-select mr-sm-2">
                            <option defaultChecked>Grade 1</option>
                            <option>Grade 2</option>
                            <option>Grade 3</option>
                            <option>Grade 4</option>
                            <option>Grade 5</option>
                            <option>Grade 6</option>
                            <option>Grade 7</option>
                            <option>Grade 8</option>
                            <option>Grade 9</option>
                            <option>Grade 10</option>
                            <option>Grade 11</option>
                            <option>FSC1</option>
                            <option>FSC2</option>
                            <option>AS-1</option>
                            <option>AS-2</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div className='row'>
                    <div className='col'>
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label className="text-light" htmlFor="InputHoursPerday">Hours Per Day</label>
                                    <select id="InputHoursPerday" onChange = {(e) => setHours(e.target.value)} className="custom-select mr-sm-2">
                                    <option defaultChecked>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    </select>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label className="text-light" htmlFor="InputNumberOfDays">Days</label>
                                    <select id="InputNumberOfDays" className="custom-select mr-sm-2" onChange={(e) => handleDays(e)}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className='col-md-3'>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="inputSpecificDays" onClick={handleSpecificClick} data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"/>
                                    <label className="form-check-label text-light" htmlFor="inputSpecificDays">Specific days</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='row mt-4 mb-4'>
                        <div className="collapse" id="collapseExample">
                            <div className="form-group">         
                                {createSelectItems()}
                            </div>
                        </div>
            
                </div>


                <div className='row mt-3 mb-5 justify-content-start'>

                            <h3 className='text-light'>Subjects</h3>

                            {courses.map((course) => (
                            <div key={`inline-checkbox-${course}`} className='col-lg-3'>
                              <Form.Check
                                label={course}
                                name="group1"
                                type='checkbox'
                                id={`inline-checkbox`}
                                className='mt-2 text-light'
                                onClick={(e) => handleSubject(course)}
                                required = {subjectNotSelected}
                              />
                            </div>
                            ))
                            }
                    
                </div>
                

                <div className='row'>
                    <div className="form-group col-md-3">
                        <label className="text-light" htmlFor="studyDays">Expected Fees (Number)</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <div className="input-group-text">Rs.</div>
                            </div>
                            <input type="text" pattern="[0-9]*" className="form-control" onChange={(e) => setFees(e.target.value)} id="inputFees" required/>
                        </div>
                    </div>
                </div>


                <div className='row justify-content-center'>
                    <button id='xxx1' type="submit" className="btn btn-primary col-4">Submit</button>
                </div>
            </form>
      
            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{submitStatus}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {submitResponce}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
   
        </div>

 );
 }

export default Register;