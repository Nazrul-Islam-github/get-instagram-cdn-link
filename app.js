// const request = require('request-promise');
const cheerio = require('cheerio');
const got = require('got');


const link = "https://www.instagram.com/p/CL1PSiDqPn0/"
''

class Extrack {
    constructor(url) {
        this.link = url;
    }

    getbody() {
        return new Promise((resolve, reject) => {
            request.get({
                uri: this.link,
                async transform(body) {
                    return await cheerio.load(body);
                }
            })

                .then(async $ => {
                    const canonicalUrl = await $('link[rel="canonical"]').attr('href');
                    const isVideo = await $('meta[name="medium"]').attr('content') === 'video';
                    // console.log(canonicalUr?l);
                    console.log($);
                    const downloadUrl = await isVideo ? $('meta[property="og:video"]').attr('content') : $('meta[property="og:image"]').attr('content');

                    if (!canonicalUrl) {
                        return reject({
                            message: `Invalid media ID`,

                        });
                    }

                    return resolve({
                        canonicalUrl,
                        downloadUrl


                    });
                })



        })
    }


}


// const newLink = new Extrack(link)
// newLink.getbody().then(data=>{
//     console.log(data);
// })
// .catch(error=>{
//     console.log(error);
// })






// -----------------------Get Cnd Link Using Got and cheerio---------------
function goto(link) {

    return new Promise((resolve, reject) => {

        return got(link).then(res => {
            const body = res.body
            return cheerio.load(body)
        })

            .then(async $ => {
                const canonicalUrl = await $('link[rel="canonical"]').attr('href');
                const isVideo = await $('meta[name="medium"]').attr('content') === 'video';
                const downloadUrl = await isVideo ? $('meta[property="og:video"]').attr('content') : $('meta[property="og:image"]').attr('content');

                // ---------------------Get Profile Pic---------------
                const profilePic = await $()




                // ----------------Reject My Promise-----------------
                if (!canonicalUrl) {
                    return reject({
                        message: `Invalid media ID`,

                    });
                }
                // ----------------Reject My Promise End -----------------


                //  ---------------------Resolve My Promise-----------
                return resolve({
                    canonicalUrl,
                    downloadUrl
                });
                //  ---------------------Resolve My Promise End-----------



            }).catch(error=>{
                return {
                error__:error
                }
            })


    })
}

goto(link).then(data => {
    console.log(data.downloadUrl);
})