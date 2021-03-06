import React from 'react'

function Vaccine() {
    return (
        <div>                
            <div class="card text-center container form border-0 rounded-0 shadow-sm px-3 py-5">
                <h1 class="mb-2" style={{fontWeight: "700"}}>Add Vaccination</h1>
                <form class="row" action="/vaccine" method="post">
                    <div class="col-md-4 offset-md-3 pt-3">
                        <select name="vaccine" class="form-select" aria-label="user name">
                                <option value="<%= user._id %>"> user.name -  user.role</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                    <div class="d-grid gap-2 pt-3">
                        <button type="submit" class="btn btn-success" type="button">Add</button>
                    </div>
                </div>
                </form>
            </div>

            <hr/>

            <div>
                <h1 class="mb-2">Student Vaccinated</h1>
                        <div class="card border-0 rounded-0 shadow-sm p-3 mb-3">
                            <div class="row d-flex align-items-center">
                                <div class="col-md-10">
                                    <p><b>Name</b> -  user.name </p>
                                    <p><b>Role</b> -  user.role </p>
                                </div>
                                <div class="col-md-2">

                                    <h5 class="text-success"><i class="fa fa-check-circle"></i> Vaccinated</h5>

                                </div>
                            </div>
                        </div>
            </div>
        </div>
    )
}

export default Vaccine

