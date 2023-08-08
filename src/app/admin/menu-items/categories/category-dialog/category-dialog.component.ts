import { Component, Inject, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Category } from "src/app/app.models";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-category-dialog",
  templateUrl: "./category-dialog.component.html",
  styleUrls: ["./category-dialog.component.scss"],
})
export class CategoryDialogComponent implements OnInit {
  public form!: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category,
    public fb: UntypedFormBuilder,
    private AppService: AppService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      category_name: [null, Validators.required],
    });

    if (this.category) {
      this.form.patchValue(this.category);
    }
  }

  public onSubmit() {
 
    if (this.form.valid) {
          this.dialogRef.close(this.form.value);
    }
  }
}
// public onSubmit() {
//   let catData = {
//     category_name: this.form.value.category_name,
//   };
//   this._AdminService.addCatogery(catData).subscribe(
//     (res) => {
//       console.log(res);
//       if (this.form.valid) {
//         this.dialogRef.close(this.form.value);
//       }
//     },
//     (err) => {
//       console.log(err);
//     }
//   );
// }
