<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoryTransactionsTable extends Migration
{
    public function up()
    {
        Schema::create('inventory_transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('product_id');
            $table->enum('transaction_type', ['restock', 'sell', 'cancel', 'return']); // Loại giao dịch
            $table->integer('quantity'); // Số lượng
            $table->dateTime('transaction_date'); // Ngày giao dịch
            $table->string('reference', 100); // Mã tham chiếu
            $table->string('cancel_reason', 255)->nullable(); // Lý do hủy (có thể null)
            $table->enum('cancel_status', ['pending', 'completed'])->nullable(); // Trạng thái hủy (có thể null)
            $table->timestamps(); // Tự động thêm `created_at` và `updated_at`
            $table->softDeletes(); // Thêm cột `deleted_at` để xóa mềm
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }
    public function down()
    {
        Schema::dropIfExists('inventory_transactions');
    }
}
