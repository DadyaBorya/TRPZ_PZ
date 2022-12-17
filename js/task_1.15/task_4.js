function main(){
    console.log(correctEmail("test@test.test"))
}

function correctEmail(email){
    return email.match(".+[@].+[.].+") !== null
}

main()