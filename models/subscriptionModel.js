import mongoose, { Mongoose } from "mongoose";

const subscriptionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },

    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0'],
    },

    currency: {
        type: String,
        enum: ['INR', 'EUR', 'USD'],
        //user can choose among only there type of currency and nothing else
        default: 'INR',
    },

    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        //user can choose among only there type of frequency and nothing else
    },

    category: {
        type: String,
        enum: ['basic', 'premium', 'pro', 'news',],
    },

    payment: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active',
    },

    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (val) {
                val <= new Date();
            },
            message: 'Start date must be in the past',
        }
    },

    renewalDate: {
        type: Date,
        validate: {
            validator: function (val) {
                return val > this.startDate;
            },
            message: 'Renewal date must be after start date',
        }
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    },

}, { timestamps: true });


// autoCalculate renewal date using start date and frequency /

subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalTime = {
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        };

        this.renewalDate= new Date(this.startDate);
        // here we assigned the renewal date to start now we have to set it according to the time selected

        this.renewalDate.setDate(this.renewalDate.getDate() + renewalTime[this.frequency]);
        // with the start date add the time with frequency 
    }

    // if the renewal date has passed then make the status expired 
    if(this.renewalDate<new Date()){
        this.status='expired';
    }

    next();

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;