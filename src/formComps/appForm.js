import React from 'react';

function AppForm(props) {
  return (
    <form className="col-lg-6 mx-auto p-2 shadow mt-3">
      <div className="mb-3">
        <label for="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" />

      </div>
      <div className="mb-3">
        <label for="phone" className="form-label">Phone</label>
        <input type="tel" className="form-control" id="phone" />
      </div>
      <div className="mb-3">
        <label for="tname" className="form-label">Name</label>
        <input type="text" className="form-control" id="tname" />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default AppForm
