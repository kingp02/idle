/* 
 * The MIT License
 *
 * Copyright 2015 Tetrinity.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

describe("GameCtrl", function(){
    var controller
    var $scope, saveDataService, numberService
    
    beforeEach(module('idle.controller'))
    beforeEach(module('idle.service'))
    
    beforeEach(inject(function(_$controller_, _SaveDataService_, _NumberService_){
        $scope = {}
        saveDataService = _SaveDataService_
        numberService = _NumberService_
        
        controller = _$controller_('GameCtrl', { $scope: $scope, SaveDataService: saveDataService, numberService: numberService })
    }))
    
    describe("saveGame", function(){
        beforeEach(function(){
            spyOn(saveDataService, "saveGame")
        })
        
        it("should call the saveGame function on the saveDataService", function(){
            $scope.saveGame()
            
            expect(saveDataService.saveGame).toHaveBeenCalled()
        })
    })
    
    describe("displayNumber", function(){
        beforeEach(function(){
            spyOn(numberService, "getDisplayName").and.returnValue("ONE MILLION DOLLARS")
        })
        
        it("should call the getDisplayName function of the numberService", function(){
            var num = bigInt(1000000)
            
            expect($scope.displayNumber(num)).toEqual("ONE MILLION DOLLARS")
            expect(numberService.getDisplayName).toHaveBeenCalledWith(num)
        })
    })
    
    describe("isProjectVisible", function(){
        beforeEach(function(){
            $scope.projects = [
                { unlocked: true },
                { unlocked: true },
                { unlocked: false },
                { unlocked: false }
            ]
        })
        
        it("should return true if the project has been unlocked", function(){
            expect($scope.isProjectVisible(1)).toEqual(true)
        })
        
        it("should return true if it immediately follows an unlocked project", function(){
            expect($scope.isProjectVisible(2)).toEqual(true)
        })
        
        it("should return false otherwise", function(){
            expect($scope.isProjectVisible(3)).toEqual(false)
        })
    })
})
