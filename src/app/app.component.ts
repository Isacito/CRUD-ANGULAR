import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  PersonObj: Client = new Client();
  PersonList: Client[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("CRUD");
    if(localData != null) {
      this.PersonList = JSON.parse(localData)
    }
  }

  openModel() {
    
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel() {
    this.PersonObj = new Client();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Client) {
    const isDelet = confirm("¿Estás seguro de que quieres eliminar?");
    if(isDelet) {
      const currentRecord =  this.PersonList.findIndex(m=> m.id === this.PersonObj.id);
      this.PersonList.splice(currentRecord,1);
      localStorage.setItem('CRUD', JSON.stringify(this.PersonList));
    }
  }
  onEdit(item: Client) {
    this.PersonObj =  item;
    this.openModel();
  }

  updateStud() {
      const currentRecord =  this.PersonList.find(m=> m.id === this.PersonObj.id);
      if(currentRecord != undefined) {
        currentRecord.name = this.PersonObj.name;
        currentRecord.address =  this.PersonObj.address;
        currentRecord.mobileNo =  this.PersonObj.mobileNo;
      };
      localStorage.setItem('CRUD', JSON.stringify(this.PersonList));
      this.closeModel()
  }
  saveStudent() {
    debugger;
    const isLocalPresent = localStorage.getItem("CRUD");
    if (isLocalPresent != null) {
      
      const oldArray = JSON.parse(isLocalPresent);
      this.PersonObj.id = oldArray.length + 1;
      oldArray.push(this.PersonObj);
      this.PersonList = oldArray;
      localStorage.setItem('CRUD', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.PersonObj);
      this.PersonObj.id = 1;
      this.PersonList = newArr;
      localStorage.setItem('CRUD', JSON.stringify(newArr));
    }
    this.closeModel()
  }
}


export class Client {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.address = '';
    this.city = '';
    this.email = '';
    this.mobileNo = '';
    this.name = '';
    this.state = '';
    this.pincode = '';
  }

}