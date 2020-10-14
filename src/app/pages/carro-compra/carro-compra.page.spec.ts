import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarroCompraPage } from './carro-compra.page';

describe('CarroCompraPage', () => {
  let component: CarroCompraPage;
  let fixture: ComponentFixture<CarroCompraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarroCompraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarroCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
