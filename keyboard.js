
InlineKeyboardMarkup={
    inline_keyboard:''
}

InlineKeyboardButton={
    text:'',
    url:'',
    callback_data:''
}





class KeyboardButton{
    constructor(text, request_contact=false ,request_location=false){
        this.KeyboardButton={};
        this.KeyboardButton["text"]=text;
        this.KeyboardButton["request_contact"]=request_contact;
        this.KeyboardButton["request_location"]=request_contact;
    }
    get(){
        return this.KeyboardButton;
    }
}
class ReplyKeyboardMarkup{
    constructor(){
        this.mainArry = new Array();
        this.replyKeyboardMarkup={
            keyboard:1,
        }
    }
    /**
     * @param {KeyboardButton} keyboard 
    */
    addRow(...keyboard){
        const temp=new Array();
        for (let i = 0; i < keyboard.length; i++) {
            temp.push(keyboard[i].get())
        }
        this.mainArry.push(temp);
        
    }
    setResize_keyboard(boolean){
        this.replyKeyboardMarkup["resize_keyboard"]=boolean;
    }
    setOne_time_keyboard(boolean){
        this.replyKeyboardMarkup["one_time_keyboard"]=boolean;
    }
    setSelective(boolean){
        this.replyKeyboardMarkup["selective"]=boolean;
    }
    get(){
        this.replyKeyboardMarkup["keyboard"] = this.mainArry;
        return this.replyKeyboardMarkup;
    }

}

module.exports.KeyboardButton = KeyboardButton;
module.exports.ReplyKeyboardMarkup = ReplyKeyboardMarkup;