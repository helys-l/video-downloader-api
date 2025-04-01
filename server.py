from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import yt_dlp
from waitress import serve 

app = Flask(__name__)
CORS(app)  # Mengizinkan permintaan dari domain lain (CORS)

@app.route('/')
def index():
    return render_template('index.html')

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
    serve(app, host="0.0.0.0", port=10000)
