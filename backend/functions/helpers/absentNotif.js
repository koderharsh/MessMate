const { admin, db } = require('../admin')

const getAbsentees = async function (req, res) {
    let currentDate = new Date().toDateString()
    
    try {
        const doc = await db.collection(`${req.user.hostelId}-absentees`).doc(currentDate).get()
        if (!doc.exists) res.json({ 'error': 'no records found.' })

        let response = {
            'breakfast': { 'count': doc.data().breakfast.length, 'list': doc.data().breakfast },
            'lunch': { 'count': doc.data().lunch.length, 'list': doc.data().lunch },
            'dinner': { 'count': doc.data().dinner.length, 'list': doc.data().dinner }
        }
        res.json(response)
    } catch (err) { res.json({ 'error': err }) }
} 

const postAbsentees = async function (req, res) {
    let currentDate = new Date().toDateString()
    //ENSURE WE HAVE 'MEAL' IN REQ.BODY
    try {
        let doc = await db.collection(`${req.user.hostelId}-absentees`).doc(currentDate).get()
        if(!doc.exists) await db.collection(`${req.user.hostelId}-absentees`).doc(currentDate).set({ })

        await db.collection(`${req.user.hostelId}-absentees`).doc(currentDate).update({
            [req.body.meal]: admin.firestore.FieldValue.arrayUnion(req.user.studentId)
        })
        res.json({ 'result': 'response recorded' })
    } catch (err) { console.log(err); res.json({ 'error': err }) }
}

// req.user={}
// req.user.hostelId='xyz';
// req.user.studentId='stud65';
// req.body.meal='dinner'

module.exports = { getAbsentees, postAbsentees }