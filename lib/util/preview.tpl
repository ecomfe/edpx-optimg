<!doctype html>
<html>
    <head>
        <title>edpx-optimg-preview</title>
        <meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="http://apps.bdimg.com/libs/bootstrap/3.2.0/css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="http://apps.bdimg.com/libs/bootstrap/3.2.0/css/bootstrap-theme.css" />
        <style type="text/css">
        .caption p {
            text-align: center;
        }
        .container {
            padding-top: 20px;
        }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- for: ${items} as ${item} -->
            <div class="row">
                <div class="col-md-6">
                    <div class="thumbnail">
                        <img src="${item.path}" />
                        <div class="caption"><p>文件大小：${item.size}</p></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="thumbnail">
                        <img src="data:image/jpeg;base64,${*item.data|base64}" />
                        <div class="caption"><p>文件大小：${item.data.length}</p></div>
                    </div>
                </div>
            </div>
            <!-- /for -->
        </div>
    </body>
</html>
