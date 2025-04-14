<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f8;
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #e3e3e3;
        }
        .header {
            background-color: #4b00b9; /* Màu tím xanh navy */
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
        }
        .content a {
            text-decoration: none;
        }
        .button {
            display: inline-block;
            padding: 12px 20px;
            margin-top: 20px;
            background-color: #4b00b9; /* Màu tím xanh navy */
            color: #ffffff;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .button:hover {
            background-color: #4b00b9; /* Tông đậm hơn */
        }
        .footer {
            background-color: #f4f4f8;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            color: #777777;
            border-top: 1px solid #e3e3e3;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Đặt lại Mật Khẩu</h1>
        </div>
        <div class="content">
            <p>PetSisters Xin Chào <strong>{{ $customer->full_name }}</strong></p>
            <p>Đây là Email được gởi từ hệ thống PetSisters,thời hạn đặt lại mật khẩu của bạn là 15 phút, vui lòng không chia sẻ thông tin này cho người khác.</p>
            <p>Bạn vừa có một yêu cầu thay đổi mật khẩu. Vui lòng nhấn vào nút dưới đây để thực hiện đặt lại mật khẩu:</p>
            <a href="{{$resetlink}}">
                <div class="button">Đặt lại mật khẩu</div>
            </a>
            <p>Nếu bạn không yêu cầu, hãy bỏ qua Email này. PetSisters xin cảm ơn.</p>
        </div>
        <div class="footer">
            © 2024 PetSisters - All rights reserved.
        </div>
    </div>
</body>
</html>
