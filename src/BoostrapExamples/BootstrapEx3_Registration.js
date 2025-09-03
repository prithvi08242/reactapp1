

function BootstrapEx3_Registration() {

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-3 border">
                    <h3>Registration form</h3>
                    <div className="mt-3">
                        <label className="form-label">Name: </label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Email: </label>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Mobile: </label>
                        <input type="number" className="form-control" />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Password: </label>
                        <input type="password" className="form-control" />
                    </div>

                    <div className="mt-3">
                        <label className="form-label">Courses: </label>
                        <select class="form-select">
                            <option selected>Choose Course</option>
                            <option value="reactjs">React JS</option>
                            <option value="angularjs">Angular JS</option>
                            <option value="nodejs">Node JS</option>
                        </select>
                    </div>

                    <div className="mt-3">
                        Choose Below Options:
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="checkDefault" />
                            <label class="form-check-label" for="checkDefault">
                                Working Professional
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="checkChecked" />
                            <label class="form-check-label" for="checkChecked">
                                Non-Working
                            </label>
                        </div>

                    </div>

                    <div className="mt-3">
                        Gender
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
                            <label class="form-check-label" for="radioDefault1">
                                Male
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault2" />
                            <label class="form-check-label" for="radioDefault2">
                                Female
                            </label>
                        </div>
                    </div>

                    <div className="mt-3" >
                        <input type="file" className="form-control"></input>
                    </div>


                    <div className="d-grid mt-3 mb-3" >
                        <button className="btn btn-primary">Register Now</button>
                    </div>

                    <div className="mt-3">
                        <div className="alert alert-success">
                            Registration Successfull
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className="alert alert-danger">
                            Invalid Login
                        </div>
                    </div>

                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BootstrapEx3_Registration;