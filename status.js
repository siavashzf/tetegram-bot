module.exports={
    setStatus(chatId,status){
        if(status==0){
            for (let i = 0; i <this.data.length; i++) {
                const e = this.data[i];
                if(e.chatId==chatId){
                    this.data.splice(i,1)
                    return true;
                }
            }
            return true;
        }
        for (let i = 0; i <this.data.length; i++) {
            const e = this.data[i];
            if(e.chatId==chatId){
                e.status=status;
                return true;
            }
        }
        this.data.push({
            chatId:chatId,
            status:status
        })
        return true;
    },
    getStatus(chatId){
        for (let i = 0; i < this.data.length; i++) {
            const e = this.data[i];
            if(e.chatId==chatId)
                return e.status;
        }
        return 0;
    },
    data:[]
}