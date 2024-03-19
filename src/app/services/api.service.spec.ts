import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { md5 } from 'js-md5';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // apiUrl, publicKey, privateKey, ts, stringToHash, hash, offset, and limit are initialized correctly
  it('should initialize apiUrl, publicKey, privateKey, ts, stringToHash, hash, offset, and limit correctly', function () {
    // Assert
    expect(service.apiUrl).toBe('http://gateway.marvel.com/v1/public');
    expect(service.publicKey).toBe('1c3e045f44c19d6e7bcfce896879a979');
    expect(service.privateKey).toBe('5b394da763c51b6976453723bf127604478ca7cd');
    expect(service.ts).toBe(1);
    expect(service.stringToHash).toBe(
      '15b394da763c51b6976453723bf127604478ca7cd1c3e045f44c19d6e7bcfce896879a979'
    );
    expect(service.hash).toBe(md5(service.stringToHash));
    expect(service.offset).toBe(0);
    expect(service.limit).toBe(50);
  });

  // http client is injected correctly
  it('should inject http client correctly', function () {
    // Assert
    expect(service.http).toBeDefined();
  });

  // Marvel API is down or returns an error
  it('should handle error when Marvel API is down or returns an error', function () {
    // Arrange
    spyOn(http, 'get').and.returnValue(throwError('Error'));

    // Act
    const result = service.fetchCharacters();

    // Assert
    result.subscribe({
      error: (error) => {
        expect(error).toBe('Error');
      },
    });
  });
});
