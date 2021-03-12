const { admin, db } = require('../admin')

const getAbsentees = async function (req, res) {
    let currentDate = req.body.testdate || new Date().toDateString()

    try {
        const doc = await db.collection(`absentees`).doc(`${req.user.hostelId}: ${currentDate}`).get()
        if (!doc.exists)
        {
            res.json({ 'error': 'no records found.' })
            return
        }

        let response = {
            'breakfast': { 'count': doc.data().breakfast.length, 'list': doc.data().breakfast },
            'lunch': { 'count': doc.data().lunch.length, 'list': doc.data().lunch },
            'dinner': { 'count': doc.data().dinner.length, 'list': doc.data().dinner }
        }
        let total=0;
        db.collection(`student`)
        .get().then(data=>{
          data.forEach(doc=>{
            if(doc.data().hostelId===req.user.hostelId)
            total++;
          })
          let value={
            ...response,
            total
          }
          return res.json(value)
        })

    } catch (err) { console.log(err); res.json({ 'error': err }) }
}

const postAbsentees = async function (req, res) {
    let currentDate = req.body.testdate || new Date().toDateString()

    //ENSURE WE HAVE 'MEAL' IN REQ.BODY
    try {
        let doc = await db.collection(`absentees`).doc(`${req.user.hostelId}: ${currentDate}`).get()
        if(!doc.exists) await db.collection(`absentees`).doc(`${req.user.hostelId}: ${currentDate}`).set({
            breakfast: [], lunch: [], dinner: []
        })

        await db.collection(`absentees`).doc(`${req.user.hostelId}: ${currentDate}`).update({
            [req.body.meal]: admin.firestore.FieldValue.arrayUnion(req.user.studentId)
        })
        res.json({ 'result': 'response recorded' })
    } catch (err) { console.log(err); res.json({ 'error': err }) }
}


module.exports = { getAbsentees, postAbsentees }
