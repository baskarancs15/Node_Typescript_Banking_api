import express from 'express';
import mongoose from 'mongoose';
import {UserCounters} from "../database/models/usercounters.model"


async function autoIncrement(sequenceName:String) {
  try {
    var ret = await UserCounters.findByIdAndUpdate({ _id: sequenceName },{ $inc: { seq: 1 } },{upsert: true , new: true})
      return ret.seq;
  } catch (err) {
    console.log("err",err)
    // res.status(400).json({
    //   err: "error",
    // });
  }
}

export default autoIncrement


