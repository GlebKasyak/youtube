export default (title: string, text: string) => (
    `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
                <title>Message</title>
                <style>
                    .box {
                    padding: 20px;
                    border: 2px solid #e6e6e6;
                    border-radius: 5px;
                    box-shadow: 0 0 15px 1px #e6e6e6;
                }
    
                    .box__title {
                    margin-top: 0;
                    color: #616161;
                }
    
                    .box__content {
                    color: #757575;
                }
                </style>
        </head>
        <body>
        <div class="box">
            <h3 class="box__title"><i>${ title }</i></h3>
            <div class="box__content">${ text }</div>
        </div>
        </body>
        </html>`
);