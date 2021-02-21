const { db } = require('../admin')

const getFeedback = async function (req, res) {
    let currentDate = new Date().toDateString()
    
    try {
        const doc = await db.collection(`feedback`).doc(`${req.user.hostelId}: ${currentDate}`).get()
        if (!doc.exists) res.json({ 'error': 'no records found.' })
        res.json(doc.data())
    } catch (err) { console.log(err); res.json({ 'error': err }) }
} 

const postFeedback = async function (req, res) {
    let currentDate = new Date().toDateString()
    
    try {
        let doc = await db.collection(`feedback`).doc(`${req.user.hostelId}: ${currentDate}`).get()
        if(!doc.exists) await db.collection(`feedback`).doc(`${req.user.hostelId}: ${currentDate}`).set({ 
            breakfast: {}, lunch: {}, dinner: {},
        })
        
        doc = await db.collection(`feedback`).doc(`${req.user.hostelId}: ${currentDate}`).get()
        
        let currentRating = doc.data()[req.body.meal].rating || { ratingAverage: 0, ratingCount: 0 }
        currentRating.ratingAverage = (currentRating.ratingAverage * currentRating.ratingCount + parseInt(req.body.rating)) / (currentRating.ratingCount + 1)
        currentRating.ratingCount++;

        let reviews = doc.data()[req.body.meal].reviews || []
        if(req.body.review != '') reviews.push({review: req.body.review, studentId: req.user.studentId})

        await doc.ref.update({
            [req.body.meal]: { rating: currentRating, reviews }
        })
        res.json({"status": "feedback saved"})
    } catch (err) { console.log(err); res.json({ 'error': err }) }
} 

module.exports = { getFeedback, postFeedback }