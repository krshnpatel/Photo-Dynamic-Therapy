clear;
image = imread('IMG_2931.png');
Rvalues = image(:,:,1);
Gvalues = image(:,:,2);
%find the elements with the largest R-values, put it in the fullRed array
indexOfRed = 1;

for i = 1:size(image,1)
    for j = 1:size(image,2)
        if (Rvalues(i,j) > 240 && Gvalues(i,j) > 130)
            fullRedRow(indexOfRed) = i;
            fullRedColumn(indexOfRed) = j;
            indexOfRed = indexOfRed + 1;
        end
    end
end

%of all those elements, find the average G-value
q = 0;
GvaluesTotal = 0;
for i = 1:size(fullRedRow,2)   
    GvaluesTotal = GvaluesTotal + im2double(image(fullRedRow(i), fullRedColumn(i),2))*255;
    q = q + 1;
end

GvalAverage = GvaluesTotal/(size(fullRedRow,2));
