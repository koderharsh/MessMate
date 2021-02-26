const testware = async (req, res, next) => {
    //we have some dummy data for hostel xyz > absentees and feedback, for this particular date.
    req.user = {
        studentId: 'RGq9KxUWaVOtZjbe8WemlaEgPXi2',
        staffId: 'o2cKptwX2xdN3XdlNknSJ9umLiB2',
        hostelId: 'xyz'
    }

    if(req.body.meal == undefined) req.body.meal = 'dinner'
    req.body.testdate = 'Sat Feb 20 2021'
    next()
}

module.exports = testware
