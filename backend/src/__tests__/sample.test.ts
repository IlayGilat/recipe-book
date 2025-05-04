// Sample test to verify Jest setup
import { DB } from "../data/db";
describe('recipies', () => {

  it('should get the recipies', () => {
      expect(DB.recipes.length).toBe(2)
  })

}); 