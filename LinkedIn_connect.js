let fs=require('fs');
let cd=require('chromedriver');
let swd= require('selenium-webdriver');
let bldr= new swd.Builder();
let driver=bldr.forBrowser('chrome').build();

let cfile=process.argv[2];
let user=process.argv[3];


(async function(){
    try{
        await driver.manage().setTimeouts({
            implicit: 10000,
            pageload:10000
        });
    let contents=await fs.promises.readFile(cfile, 'utf-8');
    let obj=JSON.parse(contents);
    let usr=obj.user;
    let pwd=obj.pwd;
    let url=obj.url;

    await driver.get(url);
    let usrelement=await driver.findElement(swd.By.css('#username'));
    let pwdelement=await driver.findElement(swd.By.css('#password'));
    await usrelement.sendKeys(usr);
    await pwdelement.sendKeys(pwd);
    let btnlogin= await driver.findElement(swd.By.css('.from__button--floating'));
    await btnlogin.click();
    
    let peopleuser= await driver.findElement(swd.By.css('.search-global-typeahead__input'));
    await peopleuser.sendKeys(user);
    
    await peopleuser.sendKeys(swd.Key.ENTER);
    await driver.manage().setTimeouts({
        implicit: 100000,
        pageload:100000
    });

    console.log("hello");
    await driver.wait(swd.until.elementLocated(swd.By.css(".name.actor-name")));
    console.log("hello2");
    let people= await driver.findElement(swd.By.css(".name.actor-name"));
    await people.click();
    

    // driver.findElements(By.xpath("//*[contains(text(),'Write and Earn')]")
//     By.xpath("//button[contains(text(),'Add Strategy')]")
// By.xpath("//button[contains(text(),'Submit')]")


    await driver.wait(swd.until.elementLocated(swd.By.css(".profile-detail")));
    console.log("hello2");






    let connect= await driver.findElement(swd.By.xpath('//button[normalize-space()="Connect"]'));
    await connect.click();
    console.log("hello24");

    await driver.wait(swd.until.elementLocated(swd.By.xpath('//button[normalize-space()="Send now"]')));
    let send= await driver.findElement(swd.By.xpath('//button[normalize-space()="Send now"]'));
    await send.click();
    console.log("hello246");
    // driver.navigate().back();

    // await driver.wait(swd.until.elementLocated(swd.By.css(".name.actor-name")));
    // console.log("hello29");
    // let people2= await driver.findElement(swd.By.css(".name.actor-name"));
    // await people2.click();








    // let ignore= await driver.findElement(swd.By.css('.msg-overlay-bubble-header'));
    // await ignore.click();
    // await people.sendKeys(swd.Key.ENTER);
    // await driver.manage().setTimeouts({
    //     implicit: 100000,
    //     pageload:100000
    // });
    
    console.log("hello");
    driver.navigate().back();

    

    
   
    
    

}
    catch(err){
        console.log(err);
    }

})();