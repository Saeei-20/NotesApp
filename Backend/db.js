import { connect } from "mongoose"
import { config } from 'dotenv';
config();


const connection = connect(process.env.mongoUrl)

export default {connection}