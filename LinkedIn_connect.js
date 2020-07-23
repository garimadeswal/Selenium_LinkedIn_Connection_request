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
    let people= await driver.findElement(swd.By.xpath("//*[text()='People']"));
    await people.click();
    
    let ignore= await driver.findElement(swd.By.css('.msg-overlay-bubble-header'));
    await ignore.click();
    // await people.sendKeys(swd.Key.ENTER);
    await driver.manage().setTimeouts({
        implicit: 100000,
        pageload:100000
    });
    
    console.log("hello");
    // await driver.wait(swd.until.elementLocated(swd.By.css("//*[text()='Connections']")));
    // console.log("error");

    await  driver.sleep(2000);

    
     await driver.executeScript("javascript:window.scrollBy(0,3000)");
     
     let nextpage = await driver.findElement(swd.By.xpath("//*[text()='Next']"));

     await nextpage.click();

    

    
   
    
    

}
    catch(err){
        console.log(err);
    }

})();