import { Component, Renderer2, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  template: `
    <div class="image-picker" (click)="openFilePicker()">
      <img
        [src]="selectedImage || placeholderImage"
        class="image-preview"
        [class.placeholder]="!selectedImage"
      >
      <input
        #fileInput
        type="file"
        accept="image/*"
        (change)="handleImageChange($event)"
        name="img"
        hidden
      >
    </div>
  `,
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  placeholderImage = 'https://www.drupal.org/files/issues/default-avatar.png';
  selectedImage: string | undefined;

  constructor(private renderer: Renderer2) {}

  openFilePicker() {
    this.renderer.selectRootElement(this.fileInput.nativeElement).click();
  }

  handleImageChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.newImgEvent.emit(selectedFile);

      // Display the selected image in the preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  @Output() newImgEvent = new EventEmitter<File>();
}
