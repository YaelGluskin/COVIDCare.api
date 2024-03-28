import java.util.Scanner;

/**
 * A simple Java program to play with shapes and numbers. - the twiter game
 * By Yael Gluskin
 */

public class SecondExercise {

    /**
     * The main method that executes the guessing game.
     *
     * @param args Command-line arguments (not used in this program).
     */
    public static void main(String[] args) {
    	
        // Prompt the user to start the game
        System.out.println("Welcome to Twiter!");
        System.out.println("To start a game, press 1 or 2.\nTo exit, press 3");
        @SuppressWarnings("resource")
		Scanner scan = new Scanner(System.in); 
        String press = scan.nextLine();

        while(!press.equals("3")) {	// Check if the user wants to exit the game    
        	if(press.equals("1")) {
        		press = playRect();
        	}else {
        		if(press.equals("2"))
            		press = playTringle();
            	else {       		
            		System.out.println("Enter your choice again (1,2), 3 to exit");
            		press = scan.nextLine();	
            	}
        	}
        	        	
        }
        System.out.println("You chose not to get out. Goodbye!");
    }
    
    
    /**
     * Plays the game for a triangle.
     *
     * @return User input to start a new game or exit.
     */
    private static String playTringle() {
    	int[] array = {0,0};
    	getParameters(array, 1);
        int width = array[0];
        int hight = array[1];
        System.out.println("Press \n\t1 to get the perimeter,\n\t2 to print the tower.");
        
        
        Scanner scan = new Scanner(System.in); 
        
        String pre = scan.nextLine();
        try { // If width not vaild, we will plat rect again.
        	
        	int choice = Integer.parseInt(pre);
        	switch (choice) {
			case 1:
				double sideLength = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(hight, 2));
				System.out.println((sideLength*2+hight));
				break;
			case 2:
				printTringle(width, hight);
				break;
			default:
				throw new NumberFormatException();
			}
        } catch (NumberFormatException e) {
        	System.out.println("Not Supported Option.");
            return "2";
        }
        
        System.out.println("You can play again!");
        return "0";
                  
    }
    private static void printTringle(int width, int height) {
		if(width%2 == 0 || width > height*2) {
			System.out.println("It is not possible to print the tringle.");
			return;
		}
		if(width == 3 && height == 3) {
			System.out.println("Nice try!");
			System.out.println(" * \n * \n***");
			return;
		}
		
		printStars(width,height);
		
	}


    private static String playRect() {
    	int[] array = {0,0};
    	String val = getParameters(array, 1);
    	if(val != null) {
    		return val;
    	}
        int width = array[0];
        int hight = array[1];
        if(width> hight*5 || hight > width*5) {
            System.out.println("The area of the tower: "+ width*hight);
        }else {
            System.out.println("The perimeter of the tower: "+ (width*2+hight*2));
        }
            
        System.out.println("You can play again!");
        return "0";
        
    }
    /**
     * Gets parameters for width and height from the user.
     *
     * @param array An array to store width and height.
     * @param num A number indicating the error condition.
     * @return Null if the parameters are valid, otherwise the error condition.
     */
    private static String getParameters(int[] array, int num) {
    	@SuppressWarnings("resource")
		Scanner scan = new Scanner(System.in); 
        System.out.println("Please enter The Width");
        String wid = scan.nextLine();
        try { // If width not vaild, we will plat rect again.
        	
        	int width = Integer.parseInt(wid);
        	System.out.println("Please enter The Hight");
            String hit = scan.nextLine();
            int hight = Integer.parseInt(hit);
            array[0] = width;
            array[1] = hight;
//            System.out.println("You can play again!");
//            return "0";
        } catch (NumberFormatException e) {
        	System.out.println("Enter numbers:");
            return ""+num;
        }
        return null;
    	
    }
	    /**
	     * Prints stars to form a triangle pattern.
	     *
	     * @param width The width of the triangle.
	     * @param height The height of the triangle.
	     */
        private static void printStars(int width, int height) {
            int starNumber, countOdds, repeatRows, remainder, repeatRowsCnt, spaceCnt;

            countOdds = countOdds(width);
            repeatRows = (height - 2) / countOdds;
            remainder = (height - 2) % countOdds;
            repeatRowsCnt = repeatRows;
            spaceCnt = width / 2;

            printFirstRow(spaceCnt, width);

            starNumber = 3;
            for (int i = 0; i <= height - 2; i++) {
                if (remainder > 0) {
                    repeatRowsCnt += remainder;
                    remainder = 0;
                }

                if (repeatRowsCnt == 0 && starNumber < width) {
                    repeatRowsCnt = repeatRows;
                    starNumber += 2;
                    spaceCnt--;
                }
                for (int j = 0; j < spaceCnt - 1; j++) {
                    System.out.print(" ");
                }
                for (int j = 1; j <= starNumber; j++) {
                    System.out.print("*");
                }

                System.out.println();
                repeatRowsCnt--;
            }
        }
        /**
         * Prints the first row of the triangle pattern.
         *
         * @param spaceCnt The number of spaces before the first star.
         * @param width The width of the triangle.
         */
        private static void printFirstRow(int spaceCnt, int width) {
            for (int i = 0; i < width; i++) {
                if (i < spaceCnt)
                    System.out.print(" ");
                if (i == width / 2)
                    System.out.print("*");
            }
            System.out.println();
        }

        

        /**
         * Counts the number of odd integers up to width - 2.
         *
         * @param width The width of the triangle.
         * @return The number of odd integers.
         */
        private static int countOdds(int width) {
            int cnt = 0;
            for (int i = width - 2; i > 1; i -= 2) {
                cnt++;
            }
            return cnt == 0 ? 1 : cnt; // not return 0
        }
    

    
}    
    