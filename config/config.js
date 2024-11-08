require('dotenv').config();

module.exports = {
	port: process.env.PORT || 3000,
	hostName: process.env.HOST_NAME || '127.0.0.1',
	secretKey: process.env.SECRET_KEY || 's1mple-k3y',
	db_server: process.env.SERVER || 'localhost,1433',
	db_database: process.env.DATABASE || null,
	db_user: process.env.DB_USER || "",
	db_password: process.env.DB_PASSWORD || "",
	root_upload_dir: process.env.ROOT_UPLOAD_DIR || "",
	video_upload_dir: process.env.VIDEO_UPLOAD_DIR || "",
	video_transcode_dir:  process.env.VIDEO_TRANSCODE_DIR || ""
}