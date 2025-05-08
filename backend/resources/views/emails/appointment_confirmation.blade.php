<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác Nhận Lịch Hẹn - PetSisters</title>
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
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
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
            width: 100px;
            height: 100px;
            object-fit: contain;
            margin-bottom: 15px;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 700;
            letter-spacing: 1px;
        }
        .content {
            padding: 32px 24px 24px 24px;
            text-align: left;
        }
        .content p {
            font-size: 16px;
            line-height: 1.7;
            color: #444;
        }
        .appointment-details {
            background: #f8f9fa;
            border-left: 4px solid #4b00b9;
            padding: 18px 20px;
            border-radius: 6px;
            margin: 24px 0;
        }
        .appointment-details p {
            margin: 8px 0;
            font-size: 15px;
        }
        .footer {
            background: #f4f4f8;
            padding: 18px;
            text-align: center;
            font-size: 14px;
            color: #888;
            border-top: 1px solid #e3e3e3;
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
            <!-- Thay link logo trên bằng logo thật của bạn -->
            <h1>Xác Nhận Lịch Hẹn</h1>
        </div>
        <div class="content">
            <p>Xin chào <strong>{{ $appointment->customer->full_name }}</strong>,</p>
            <p>Cảm ơn bạn đã đặt lịch hẹn với <strong>PetSisters</strong>! Dưới đây là thông tin chi tiết về lịch hẹn của bạn:</p>
            <div class="appointment-details">
                <p><strong>Dịch vụ:</strong> {{ $service->service_name }}</p>
                <p><strong>Thú cưng:</strong> {{ $appointment->pet_name }}</p>
                <p><strong>Loại thú cưng:</strong> {{ $appointment->pet_type }}</p>
                <p><strong>Ngày hẹn:</strong> {{ \Carbon\Carbon::parse($appointment->appointment_date)->format('d/m/Y H:i') }}</p>
                <p><strong>Tổng chi phí:</strong> {{ number_format($appointment->total_price, 0, ',', '.') }} VNĐ</p>
                @if($appointment->notes)
                <p><strong>Ghi chú:</strong> {{ $appointment->notes }}</p>
                @endif
            </div>
            <p style="margin-top: 24px;">Vui lòng đến đúng giờ hẹn. Nếu bạn cần thay đổi hoặc hủy lịch hẹn, hãy liên hệ với chúng tôi càng sớm càng tốt.</p>
            <p>Trân trọng,<br><strong>Đội ngũ PetSisters</strong></p>
        </div>
        <div class="footer">
            © 2024 PetSisters - All rights reserved.<br>
            <a href="http://localhost:3000/" style="color:#4b00b9;text-decoration:none;">petsisters.vn</a>
        </div>
    </div>
</body>
</html>
