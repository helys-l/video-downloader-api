from flask import Flask, request, jsonify
from flask_cors import CORS
from waitress import serve
import yt_dlp

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Server is running!"

@app.route('/formats')
def get_formats():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL tidak diberikan"}), 400

    try:
        ydl_opts = {"quiet": True}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            formats = [
                {
                    "format_id": f["format_id"],
                    "ext": f["ext"],
                    "resolution": f.get("resolution", "audio") if "height" in f else "audio",
                    "url": f["url"]
                }
                for f in info["formats"]
            ]
            return jsonify({"title": info["title"], "thumbnail": info["thumbnail"], "formats": formats})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 Server starting...")  # Tambahkan debug message
    serve(app, host="0.0.0.0", port=5000)  
