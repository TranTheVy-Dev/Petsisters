"use client";
import React, { useState, useEffect } from 'react';
import styles from './ProfileForm.module.css'; // Nhập file CSS
import Link from 'next/link';

const ProfileForm = () => {
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    useEffect(() => {
        const savedAvatar = localStorage.getItem('avatar');
        if (savedAvatar) {
            setAvatarPreview(savedAvatar);
        }
    }, []);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
                localStorage.setItem('avatar', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.avatar}>
                    <img
                        src={avatarPreview || 'default-avatar.png'} 
                        alt="Avatar"
                        className={styles.avatarImage}
                    />
                </div>
                <h2 className={styles.username}>123</h2>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>Tài khoản</li>
                    <li className={styles.menuItem}><Link href="trangnguoidung/trang-don-hang">Đơn Hàng</Link></li>
                    <li className={styles.menuItem}>Đăng xuất</li>
                </ul>
            </div>
            <div className={styles.formContainer}>
                <h1 className={styles.header}>Thông Tin Tài Khoản</h1>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên Tài Khoản</label>
                        <input type="text" placeholder="Nhập tên tài khoản" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên đầy đủ</label>
                        <input type="text" placeholder="Nhập tên đầy đủ" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input type="email" placeholder="Nhập email của bạn" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Số điện thoại</label>
                        <input type="text" placeholder="Nhập số điện thoại" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Địa chỉ</label>
                        <input type="text" placeholder="Nhập địa chỉ của bạn" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Thay đổi avatar</label>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} className={styles.fileInput} />
                    </div>
                    <button type="button" className={styles.button}>Lưu lại</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;