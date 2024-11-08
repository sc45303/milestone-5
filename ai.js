var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        this.form = document.getElementById('resume-form');
        this.resumeDisplay = document.getElementById('resume-display');
        this.shareableLinkContainer = document.getElementById('shareable-link-container');
        this.shareableLink = document.getElementById('shareable-link');
        this.downloadPdfButton = document.getElementById('download-pdf');
        this.initEventListeners();
        this.loadResumeFromURL();
    }
    ResumeBuilder.prototype.initEventListeners = function () {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.downloadPdfButton.addEventListener('click', this.downloadPDF.bind(this));
        this.resumeDisplay.addEventListener('input', this.handleResumeEdit.bind(this));
    };
    ResumeBuilder.prototype.handleSubmit = function (event) {
        event.preventDefault();
        var formData = new FormData(this.form);
        var resumeData = {
            username: formData.get('username'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            education: formData.get('education'),
            experience: formData.get('experience'),
            skills: formData.get('skills'),
            projects: formData.get('projects')
        };
        this.generateResume(resumeData);
        this.generateShareableLink(resumeData);
    };
    ResumeBuilder.prototype.generateResume = function (data) {
        this.resumeDisplay.innerHTML = "\n      <h2>".concat(data.name, "</h2>\n      <p>Email: ").concat(data.email, " | Phone: ").concat(data.phone, "</p>\n      <h3>Education</h3>\n      <p>").concat(data.education, "</p>\n      <h3>Experience</h3>\n      <p>").concat(data.experience, "</p>\n      <h3>Skills</h3>\n      <p>").concat(data.skills, "</p>\n      <h3>Projects</h3>\n      <p>").concat(data.projects, "</p>\n    ");
    };
    ResumeBuilder.prototype.generateShareableLink = function (data) {
        var encodedData = encodeURIComponent(JSON.stringify(data));
        var url = "".concat(window.location.href.split('?')[0], "?data=").concat(encodedData);
        this.shareableLink.href = url;
        this.shareableLink.textContent = url;
        this.shareableLinkContainer.style.display = 'block';
    };
    ResumeBuilder.prototype.loadResumeFromURL = function () {
        var urlParams = new URLSearchParams(window.location.search);
        var encodedData = urlParams.get('data');
        if (encodedData) {
            try {
                var decodedData = JSON.parse(decodeURIComponent(encodedData));
                this.populateForm(decodedData);
                this.generateResume(decodedData);
                this.generateShareableLink(decodedData);
            }
            catch (error) {
                console.error('Error parsing resume data from URL:', error);
            }
        }
    };
    ResumeBuilder.prototype.populateForm = function (data) {
        var _this = this;
        Object.entries(data).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var input = _this.form.elements.namedItem(key);
            if (input) {
                input.value = value;
            }
        });
    };
    ResumeBuilder.prototype.handleResumeEdit = function () {
        var updatedData = {
            username: this.form.elements.namedItem('username').value,
            name: this.form.elements.namedItem('name').value,
            email: this.form.elements.namedItem('email').value,
            phone: this.form.elements.namedItem('phone').value,
            education: this.form.elements.namedItem('education').value,
            experience: this.form.elements.namedItem('experience').value,
            skills: this.form.elements.namedItem('skills').value,
            projects: this.form.elements.namedItem('projects').value
        };
        this.generateShareableLink(updatedData);
    };
    ResumeBuilder.prototype.downloadPDF = function () {
        // Note: This is a placeholder. Actual PDF generation would require a library like jsPDF
        console.log('Downloading PDF...');
        alert('PDF download functionality would be implemented here. You would typically use a library like jsPDF to generate the PDF from the resume content.');
    };
    return ResumeBuilder;
}());
// Initialize the resume builder when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    new ResumeBuilder();
});
