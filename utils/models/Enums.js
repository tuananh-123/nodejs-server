const HttpStatus = {
    OK: 200,                    // Yêu cầu thành công và server đã trả về dữ liệu yêu cầu.
    CREATED: 201,               // Tài nguyên mới đã được tạo thành công.
    ACCEPTED: 202,              // Yêu cầu đã được chấp nhận để xử lý, nhưng chưa hoàn thành.
    NO_CONTENT: 204,            // Server đã xử lý thành công yêu cầu, nhưng không trả về nội dung gì.
    
    BAD_REQUEST: 400,           // Yêu cầu không hợp lệ, thường là do client gửi dữ liệu sai hoặc không đầy đủ.
    UNAUTHORIZED: 401,          // Người dùng chưa xác thực hoặc xác thực không hợp lệ.
    FORBIDDEN: 403,             // Người dùng đã xác thực nhưng không có quyền truy cập tài nguyên.
    NOT_FOUND: 404,             // Tài nguyên yêu cầu không tồn tại trên server.
    METHOD_NOT_ALLOWED: 405,    // Phương thức HTTP không được phép trên tài nguyên này (ví dụ, sử dụng POST thay vì GET).
    CONFLICT: 409,              // Xung đột dữ liệu, thường xảy ra khi tài nguyên đang ở trạng thái không thể cập nhật (ví dụ, đăng ký email đã tồn tại).
    
    INTERNAL_SERVER_ERROR: 500, // Lỗi phía server, server gặp vấn đề khi xử lý yêu cầu.
    NOT_IMPLEMENTED: 501,       // Server chưa hỗ trợ chức năng này.
    BAD_GATEWAY: 502,           // Server nhận được phản hồi không hợp lệ từ server trung gian (gateway).
    SERVICE_UNAVAILABLE: 503,   // Server hiện tại không khả dụng (do quá tải hoặc bảo trì).
    GATEWAY_TIMEOUT: 504        // Server trung gian không nhận được phản hồi từ server nguồn đúng thời gian.
};

const SubscriptionType = {
	FREE: 0, // Gói miễn phí
	PLUS: 1  // Gói nâng cấp
};

const DataType = {
	STRING: "string",
	UNDERFINE: "undefined",
	OBJECT: "object",
	BOOLEAN: "boolean",
	NUMBER: "number",
	BIGINT: "bigint",
	SYMBOL: "symbol"
};

module.exports = {
	HttpStatus,
	SubscriptionType,
	DataType
};
