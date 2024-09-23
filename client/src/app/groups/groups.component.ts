import {Component, OnInit} from '@angular/core';
import {GroupService} from "./groups.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
  groups: any[] = [];
  newGroup = { number: null, subgroupLetter: '' };
  isEditMode = false;
  currentGroupId: string | null = null;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.onLoadGroups();
  }

  onLoadGroups(): void {
    this.groupService.getGroups().subscribe(
      (data) => this.groups = data,
      (error) => console.error('Error fetching groups:', error)
    );
  }

  onAddGroup(): void {
    if (this.newGroup.number !== null && this.newGroup.subgroupLetter.trim()) {
      if (this.isEditMode && this.currentGroupId) {
        this.groupService.updateGroup(this.currentGroupId, this.newGroup).subscribe(
          () => {
            this.onLoadGroups();
            this.resetForm();
          },
          (error) => console.error('Error updating group:', error)
        );
      } else {
        this.groupService.addGroup(this.newGroup).subscribe(
          () => {
            this.onLoadGroups();
            this.resetForm();
          },
          (error) => console.error('Error adding group:', error)
        );
      }
    }
  }

  onEditGroup(group: any): void {
    this.newGroup = { ...group };
    this.isEditMode = true;
    this.currentGroupId = group._id;
  }

  resetForm(): void {
    this.newGroup = { number: null, subgroupLetter: '' };
    this.isEditMode = false;
    this.currentGroupId = null;
  }

  onDeleteGroup(id: string): void {
    this.groupService.deleteGroup(id).subscribe(
      () => this.onLoadGroups(),
      (error) => console.error('Error deleting group:', error)
    );
  }
}
