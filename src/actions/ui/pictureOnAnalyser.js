export default function pictureOnAnalyser(picturePath) {
	return {
		type: "CHANGE_PICTURE_ON_ANALYSER",
		payload: picturePath
	}
}