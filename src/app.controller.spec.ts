import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: any;

  beforeEach(async () => {
    service = new AppService
  });

  describe('redirection', () => {
    it('should give true when there are two player', () => {
      const v1 = service.addPlayer("SuperMan")
      const v2 = service.addPlayer("Ironman")
      const value = service.redirection()
      expect(value.isReady).toBe(true)
    })

    it('should give false when there is one player', () => {
      const v1 = service.addPlayer("superMan")
      const value = service.redirection()
      expect(value.isReady).toBe(false)
    })

    it('should give false when there are no players', () => {
      const value = service.redirection()
      expect(value.isReady).toBe(false)
    })
  })


  describe('addPlayer', () => {
    it('should give true when there are two player', () => {
      const v1 = service.addPlayer("SuperMan")
      const v2 = service.addPlayer("Ironman")
      expect(v2.isReady).toBe(true)
    })

    it('should give false when there is one player', () => {
      const v1 = service.addPlayer("superMan")
      expect(v1.isReady).toBe(false)
    })
  })

});

