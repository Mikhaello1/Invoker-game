combination = 'WWQ';
spheresRow = ['w', 'w', 'Q'];

function combinationCheck(spheres, comb){
    let i = 0;
    let j = 0;
    let checker = 0;
    while(comb.length>0 || checker!=3){
        
        if (spheres[i] == comb[j]){
            comb.splice(j, 1);
            spheres.splice(i, 1);
            checker++;
            console.log(spheres, comb, checker)
            i = 0;
            j = 0;
        }
        if (spheres[i] != comb[j]){
            i++;
        }
        if (i == spheres.length && checker!=3){
            return false;
        }
        if ((comb.length == 1 && spheres.length == 1) && comb[0] != spheres[0]){
            return false;
        }
        
    }
    if(checker == 3){
        return true;
    } else return false;
    
    
    
}

console.log(combinationCheck(spheresRow, combination.split("")))