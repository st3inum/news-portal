const News = require('../models/News')
const {StatusCodes} = require('http-status-codes')
const {
    NotFoundError,
    BadRequestError,
  } = require('../errors')

const getAllNews = async (req,res) =>{
    const news = await News.find({}).sort('createdAt')
    res.status(StatusCodes.OK).json({news, count:news.length})
}

// const getJobs = async (req,res) =>{
//     const {user:{userId},params:{id:jobId}} = req

//     const job = await News.findOne({
//         _id:jobId,createdBy:userId
//     })

//     if(!job){
//         throw new NotFoundError(`No job with id ${jobId}`)
//     }

//     res.status(StatusCodes.OK).json({job})
// }

const createNews = async (req,res) =>{
    req.body.createdBy = req.user.userId
    const news = await News.create({...req.body})
    res.status(StatusCodes.CREATED).json({news})
}

const updateNews = async (req,res) =>{
    const {
        body:{haedline,description},
        user:{userId},
        params:{id:newsId}
    } = req

    if(haedline === '' || description === ''){
        throw new BadRequestError('Company or position fields cannot be empty')
    }

    const news = await News.findByIdAndUpdate({
        _id: newsId,
        createdBy:userId
    },req.body,{new:true,runValidators:true})

    if(!news){
        throw new NotFoundError(`No news with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({news})
}

const deleteNews = async (req,res) =>{
    const {user:{userId},params:{id:newsId}} = req
    const news = await News.findByIdAndRemove({
        _id:newsId,
        createdBy:userId
    })

    if(!news){
        throw new NotFoundError(`No news with id ${jobId}`)
    }

    res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllNews,
    // getJobs,
    createNews,
    updateNews,
    deleteNews,
}
