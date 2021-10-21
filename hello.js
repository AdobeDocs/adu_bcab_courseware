function main(params){
    const name = params.name ? params.name : "Stranger"
    return {
        message: `Hi, ${name}, I hope you are having a nice day.`
    }
}