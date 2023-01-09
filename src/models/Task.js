import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const taskSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },
       
        date: {
            type: Date,
            required: false,
        },
       
      
        
        
        completed:{
           type: Boolean,
           default:false,
           required:false,
        },
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

taskSchema.plugin(mongoosePaginate);

export default model('Task', taskSchema);