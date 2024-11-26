import mongoose {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";


const userSchema = new Schema({
    username : {
        type : String,
        require : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        require : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullName : {
        type : String,
        require : true,
        lowercase : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String,
        require : true,
    },
    coverImage : {
        type : String,
    },
    watchHistory : {
        type : Schema.Types.ObjectId,   
        ref : 'Video'
    },
    passowrd : {
        type : String,
        require : [true ,"Passowrd is required"]
    },
    refreshToken : {
        type : String,
    }
},
{
    timestamps : true,
}
);

userSchema.pre('save', async function(next) {
    if(this.isModified('passowrd')){
        this.passowrd = await bcrypt.hash(this.passowrd, 10);
    }
    next();
})

userSchema.methods.isPasswordCorrect = async function (passowrd) {
    return await bcrypt.compare(passowrd, this.passowrd);
}

userSchema.methods.generateAccessToken = async function (){
return jsonwebtoken.sign({
        _id : this._id,
        username : this.username,
        email : this.email,
        fullName : this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }

)
}
userSchema.methods.generateRefreshToken = async function (){
    return jsonwebtoken.sign({
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    }

export const User = mongoose.model('User',userSchema);
