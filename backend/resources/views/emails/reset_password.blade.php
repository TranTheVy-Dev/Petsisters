<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt lại Mật Khẩu - PetSisters</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f4f4f8;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(75, 0, 185, 0.1);
            overflow: hidden;
            border: 1px solid #e3e3e3;
        }
        .header {
            background: linear-gradient(90deg, #4b00b9 10%, #8a2be2 90%);
            color: #fff;
            padding: 32px 24px 24px 24px;
            text-align: center;
            position: relative;
        }
        .header img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            margin-bottom: 12px;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 700;
            letter-spacing: 1px;
        }
        .content {
            padding: 32px 24px 24px 24px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.7;
            color: #444;
            text-align: left;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            padding: 14px 32px;
            background: #4b00b9;
            color: #ffffff;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(75, 0, 185, 0.2);
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        .button:hover {
            background: #3a0090;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(75, 0, 185, 0.3);
            color: #ffffff;
        }
        .footer {
            background: #f4f4f8;
            padding: 18px;
            text-align: center;
            font-size: 14px;
            color: #888;
            border-top: 1px solid #e3e3e3;
        }
        .footer a {
            color: #4b00b9;
            text-decoration: none;
            font-weight: 600;
        }
        .footer a:hover {
            color: #3a0090;
        }
        @media (max-width: 600px) {
            .email-container { margin: 0; border-radius: 0; }
            .content, .header { padding: 16px; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://res.cloudinary.com/dmped9z6o/image/upload/v1734580462/petsisters/images/avatar/avatar_676398ed0263a.png" alt="PetSisters Logo" />
            <h1>Đặt lại Mật Khẩu</h1>
        </div>
        <div class="content">
            <p>Xin chào <strong>{{ $customer->full_name }}</strong>,</p>
            <p>Đây là email được gửi từ hệ thống PetSisters. Thời hạn đặt lại mật khẩu của bạn là 15 phút, vui lòng không chia sẻ Email này cho người khác.</p>
            <p>Bạn vừa có một yêu cầu thay đổi mật khẩu. Vui lòng nhấn vào nút dưới đây để thực hiện đặt lại mật khẩu:</p>
            <div class="button-container">
                <a href="{{$resetlink}}" class="button">Đặt lại mật khẩu</a>
            </div>
            <p>Nếu bạn không yêu cầu, hãy bỏ qua email này. PetSisters xin cảm ơn.</p>
        </div>
        <div class="footer">
            © 2024 PetSisters - All rights reserved.<br>
            <a href="http://localhost:3000/">petsisters.vn</a>
        </div>
    </div>
</body>
</html>
